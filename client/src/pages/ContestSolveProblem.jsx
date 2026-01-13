import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Clock, Play, Send, Check, X, Code2, FileText, Terminal, Trophy, ArrowLeft, AlertTriangle, LogOut, Shield } from 'lucide-react';
import SimpleCodeEditor from '../components/SimpleCodeEditor';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const BOILERPLATES = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    
    return 0;
}`,

    java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here
    }
}`
};

const ContestSolveProblem = () => {
    const { problemId, contestId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const contestType = searchParams.get('type') || 'global';

    // State
    const [problem, setProblem] = useState(null);
    const [contest, setContest] = useState(null);
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(BOILERPLATES.cpp);
    const [output, setOutput] = useState('');
    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [verdict, setVerdict] = useState(null);
    const [testResults, setTestResults] = useState([]);
    const [activeTab, setActiveTab] = useState('description');
    const [rightTab, setRightTab] = useState('testcase');
    const [timeLeft, setTimeLeft] = useState(null);
    const [splitPos, setSplitPos] = useState(45);
    const [contestProblems, setContestProblems] = useState([]);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);

    // Submissions State
    const [submissions, setSubmissions] = useState([]);

    // Security: Full-screen enforcement REMOVED as per user request
    const contestEnded = false; // Simplified state replacement or just keep the used one if needed. 
    // Actually setContestEnded is used. Let's keep that.
    const [isContestEnded, setContestEnded] = useState(false);

    const containerRef = useRef(null);

    // Enter full-screen mode
    const enterFullScreen = async () => {
        const elem = document.documentElement;
        try {
            if (elem.requestFullscreen) {
                await elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                await elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                await elem.msRequestFullscreen();
            }
        } catch (err) {
            console.log("Full-screen request blocked or failed:", err);
            // The security overlay will simply show up, asking user to click manually.
        }
    };

    // Exit full-screen mode
    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    };

    // Handle End Contest
    const handleEndContest = () => {
        setContestEnded(true);
        exitFullScreen();
        toast.info("You have ended the contest");
        navigate(`/contests/global/${contestId}`);
    };

    // Security enforcement hooks REMOVED



    // Fetch submissions
    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/problems/${problemId}/submissions`, {
                headers: { "token": token }
            });
            const data = await response.json();
            setSubmissions(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching submissions:", err);
            setSubmissions([]);
        }
    };

    // Fetch problem and contest data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Reset code when problem changes
                setCode(BOILERPLATES[language]);
                setVerdict(null);
                setTestResults([]);
                setOutput('');

                const token = localStorage.getItem("token");

                const problemRes = await fetch(`${API_URL}/api/problems/${problemId}`, {
                    headers: { token }
                });
                if (problemRes.ok) {
                    const data = await problemRes.json();
                    setProblem(data);
                }

                const contestRes = await fetch(`${API_URL}/api/contests/global/${contestId}`, {
                    headers: { token }
                });
                if (contestRes.ok) {
                    const data = await contestRes.json();
                    setContest(data.contest || null);
                    setContestProblems(data.problems || []);

                    if (data.problems && data.problems.length > 0) {
                        const idx = data.problems.findIndex(p => p.problem_id == problemId);
                        setCurrentProblemIndex(idx >= 0 ? idx : 0);
                    }

                    if (data.contest && data.contest.end_time) {
                        const end = new Date(data.contest.end_time);
                        const now = new Date();
                        if (now < end) {
                            setTimeLeft(Math.floor((end - now) / 1000));
                        } else {
                            setTimeLeft(0); // Past contest
                        }
                    }
                }

                // Fetch submissions for the new problem
                fetchSubmissions();

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [problemId, contestId]);

    // Timer
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    toast.warning("Contest has ended!");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        if (!seconds || seconds <= 0) return "00:00:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        setLanguage(newLang);
        setCode(BOILERPLATES[newLang]);
    };

    const handleRun = async () => {
        if (!problem) return;
        setRunLoading(true);
        setOutput('');
        // Don't reset verdict here, strictly for Output tab functionality

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/execute/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token },
                body: JSON.stringify({
                    code,
                    language,
                    problem_id: problemId,
                    input: problem.test_case_input || ''
                })
            });
            const parseRes = await res.json();

            if (parseRes.compile && parseRes.compile.code !== 0) {
                setOutput(`Compilation Error:\n${parseRes.compile.stderr}`);
            } else if (parseRes.run && parseRes.run.code !== 0) {
                setOutput(`Runtime Error:\n${parseRes.run.stderr || 'Program crashed'}`);
            } else {
                const actualOutput = (parseRes.run?.stdout || '').trim();
                const expectedOutput = (parseRes.expected_output || '').trim();

                if (!parseRes.expected_output) {
                    setOutput(`⚠️ No sample test case available\n\nYour code ran successfully:\n\nOutput:\n${actualOutput || '(no output)'}`);
                } else {
                    const passed = actualOutput === expectedOutput;

                    if (passed) {
                        setOutput(`✅ Sample Test Case Passed!\n\nInput:\n${problem.test_case_input}\n\nExpected Output:\n${expectedOutput}\n\nYour Output:\n${actualOutput}`);
                    } else {
                        setOutput(`❌ Sample Test Case Failed\n\nInput:\n${problem.test_case_input}\n\nExpected Output:\n${expectedOutput}\n\nYour Output:\n${actualOutput}`);
                    }
                }
            }
            setRightTab('output');
        } catch (err) {
            console.error(err);
            setOutput("Error running code: " + err.message);
        } finally {
            setRunLoading(false);
        }
    };

    // Stream-enabled Submit Handler
    const handleSubmit = async () => {
        if (!problem) return;
        setSubmitLoading(true);
        setVerdict(null);
        setTestResults([]);
        setOutput('Initializing submission...');

        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/execute/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token },
                body: JSON.stringify({
                    code,
                    language,
                    problem_id: problemId,
                    contest_id: contestId,
                    contest_type: contestType
                })
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split('\n\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const jsonStr = line.replace('data: ', '');
                        try {
                            const data = JSON.parse(jsonStr);

                            if (data.type === 'status' || data.type === 'progress') {
                                // Update Progress UI
                                if (data.message) {
                                    setOutput(prev => {
                                        return `${data.message}\n(Processed ${data.current || 0}/${data.total || '?'} cases)`;
                                    });
                                }
                            }
                            else if (data.type === 'final') {
                                // Final Result Handling
                                const parseRes = data;
                                setVerdict(parseRes.verdict);
                                setTestResults(parseRes.test_results || []);
                                setRightTab('result');

                                if (parseRes.verdict === 'Accepted') {
                                    toast.success("🎉 Accepted!");
                                } else {
                                    toast.error(parseRes.verdict || "Wrong Answer");
                                }

                                // Refresh submissions list
                                fetchSubmissions();

                                if (parseRes.first_failure) {
                                    let failureOutput = '';

                                    if (parseRes.sample_failed) {
                                        failureOutput = `❌ Sample Test Case Failed!\n\nInput:\n${parseRes.first_failure.input}\n\nExpected Output:\n${parseRes.first_failure.expected}\n\nYour Output:\n${parseRes.first_failure.actual}\n\n💡 Fix your code to pass the sample test case first!`;
                                    } else if (parseRes.first_failure.message) {
                                        failureOutput = `✅ Sample test case passed!\n\n❌ ${parseRes.first_failure.message}\n\n💡 Debug your code for edge cases and hidden scenarios.`;
                                    } else {
                                        failureOutput = `Failed Test:\nExpected: ${parseRes.first_failure.expected}\nYour Output: ${parseRes.first_failure.actual}`;
                                    }

                                    setOutput(`Verdict: ${parseRes.verdict}\n\nPassed: ${parseRes.passed_count}/${parseRes.total_count} test cases\n\n${failureOutput}`);
                                } else {
                                    setOutput(`Verdict: ${parseRes.verdict}\n\nPassed all ${parseRes.total_count} test cases! ✅\n\nCongratulations! Your solution is correct! 🎉`);
                                }
                            }
                        } catch (e) {
                            console.error("Error parsing stream chunk", e);
                        }
                    }
                }
            }

        } catch (err) {
            toast.error("Submission failed");
            setOutput(`Submission Error: ${err.message}`);
        } finally {
            setSubmitLoading(false);
        }
    };

    const navigateToProblem = (idx) => {
        if (contestProblems[idx]) {
            navigate(`/contest/${contestId}/problem/${contestProblems[idx].problem_id}?type=${contestType}`);
        }
    };

    if (!problem || !contest) {
        return (
            <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
        );
    }



    return (
        <div className="h-screen bg-[#1a1a2e] text-gray-100 flex flex-col overflow-hidden">
            {/* Header - LeetCode Style */}
            <header className="bg-[#16162a] border-b border-gray-800 px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(`/contests/global/${contestId}`)}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
                        title="Back to Contest Dashboard"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-sm">{contest.title}</span>
                    </div>

                </div>

                {/* Problem Navigation */}
                <div className="flex items-center gap-2">
                    {(contestProblems || []).map((p, i) => (
                        <button
                            key={p.problem_id}
                            onClick={() => navigateToProblem(i)}
                            className={`w-8 h-8 rounded-lg text-sm font-bold transition ${p.problem_id == problemId
                                ? 'bg-cyan-600 text-white'
                                : p.solved
                                    ? 'bg-green-600/20 text-green-400 border border-green-600/50'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {String.fromCharCode(65 + i)}
                        </button>
                    ))}
                </div>

                {/* Timer & End Contest */}
                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg ${timeLeft && timeLeft < 300 ? 'bg-red-900/50 text-red-400' : 'bg-gray-800'
                        }`}>
                        <Clock className={`w-4 h-4 ${timeLeft && timeLeft < 300 ? 'animate-pulse' : ''}`} />
                        <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                    </div>
                </div>
            </header>

            {/* Main Content - Split Pane */}
            <div ref={containerRef} className="flex-1 flex overflow-hidden">
                {/* Left Panel - Problem Description */}
                {/* Left Panel - Problem Description & Submissions */}
                <div
                    className="flex flex-col bg-[#1e1e3f] border-r border-gray-800"
                    style={{ width: `${splitPos}%` }}
                >
                    <div className="flex border-b border-gray-800 bg-[#16162a]">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition ${activeTab === 'description'
                                ? 'text-cyan-400 border-b-2 border-cyan-400'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            <FileText className="w-4 h-4" />
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('submissions')}
                            className={`px-4 py-2.5 text-sm font-medium flex items-center gap-2 transition ${activeTab === 'submissions'
                                ? 'text-cyan-400 border-b-2 border-cyan-400'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            <Clock className="w-4 h-4" />
                            Submissions
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'description' ? (
                            <>
                                <div className="mb-4">
                                    <span className="text-cyan-400 font-mono text-sm">
                                        Problem {String.fromCharCode(65 + currentProblemIndex)}
                                    </span>
                                    <h1 className="text-2xl font-bold text-white mt-1">{problem.title}</h1>
                                    <div className="flex gap-2 mt-3">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${problem.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                                                'bg-red-900/50 text-red-400'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                                            {problem.topic}
                                        </span>
                                    </div>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {problem.description}
                                    </div>

                                    {problem.constraints && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-white mb-2">Constraints</h3>
                                            <div className="bg-gray-800/50 rounded-lg p-4 text-gray-300 font-mono text-sm">
                                                {problem.constraints}
                                            </div>
                                        </div>
                                    )}

                                    {problem.test_case_input && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-white mb-2">Sample Input</h3>
                                            <pre className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                                                {problem.test_case_input}
                                            </pre>
                                        </div>
                                    )}

                                    {problem.test_case_output && (
                                        <div className="mt-4">
                                            <h3 className="text-lg font-semibold text-white mb-2">Sample Output</h3>
                                            <pre className="bg-gray-900 rounded-lg p-4 text-cyan-400 font-mono text-sm overflow-x-auto">
                                                {problem.test_case_output}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white mb-4">My Submissions</h2>
                                {submissions.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        No submissions yet.
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {submissions.map((sub) => (
                                            <div
                                                key={sub.submission_id}
                                                className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${sub.status === 'Accepted' ? 'bg-green-900/50 text-green-400' :
                                                        sub.status === 'Compilation Error' ? 'bg-yellow-900/50 text-yellow-400' :
                                                            'bg-red-900/50 text-red-400'
                                                        }`}>
                                                        {sub.status}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(sub.submitted_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-xs text-gray-400 font-mono bg-gray-900 px-2 py-1 rounded">
                                                        {sub.language}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            setCode(sub.code);
                                                            if (sub.language) setLanguage(sub.language);
                                                            toast.info(`Code loaded (${sub.language || 'cpp'})`);
                                                        }}
                                                        className="text-xs bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded transition-colors"
                                                    >
                                                        Load Code
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Resizer */}
                <div
                    className="w-1 bg-gray-800 hover:bg-cyan-600 cursor-col-resize transition"
                    onMouseDown={(e) => {
                        const startX = e.clientX;
                        const startPos = splitPos;
                        const container = containerRef.current;

                        const onMouseMove = (e) => {
                            const containerWidth = container.offsetWidth;
                            const delta = e.clientX - startX;
                            const newPos = startPos + (delta / containerWidth) * 100;
                            setSplitPos(Math.max(25, Math.min(75, newPos)));
                        };

                        const onMouseUp = () => {
                            document.removeEventListener('mousemove', onMouseMove);
                            document.removeEventListener('mouseup', onMouseUp);
                        };

                        document.addEventListener('mousemove', onMouseMove);
                        document.addEventListener('mouseup', onMouseUp);
                    }}
                />

                {/* Right Panel - Code Editor */}
                <div className="flex flex-col flex-1 bg-[#1e1e3f]">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#16162a] border-b border-gray-800">
                        <div className="flex items-center gap-2">
                            <Code2 className="w-4 h-4 text-gray-400" />
                            <select
                                value={language}
                                onChange={handleLanguageChange}
                                className="bg-gray-800 text-gray-300 text-sm rounded-lg px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                            >
                                <option value="cpp">C++ 17</option>

                                <option value="java">Java 17</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleRun}
                                disabled={runLoading}
                                className="flex items-center gap-2 px-4 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
                            >
                                <Play className="w-4 h-4" />
                                {runLoading ? 'Running...' : 'Run'}
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={submitLoading}
                                className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-medium rounded-lg transition disabled:opacity-50"
                            >
                                <Send className="w-4 h-4" />
                                {submitLoading ? 'Submitting...' : 'Submit'}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <SimpleCodeEditor
                            value={code || ''}
                            onChange={setCode}
                            language={language}
                            theme="vs-dark"
                        />
                    </div>

                    <div className="h-48 border-t border-gray-800 bg-[#16162a] flex flex-col">
                        <div className="flex border-b border-gray-800">
                            <button
                                onClick={() => setRightTab('testcase')}
                                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${rightTab === 'testcase' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500'
                                    }`}
                            >
                                <Terminal className="w-4 h-4" />
                                Testcase
                            </button>
                            <button
                                onClick={() => setRightTab('output')}
                                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${rightTab === 'output' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500'
                                    }`}
                            >
                                <Code2 className="w-4 h-4" />
                                Output
                            </button>
                            <button
                                onClick={() => setRightTab('result')}
                                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${rightTab === 'result' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-500'
                                    }`}
                            >
                                {verdict === 'Accepted' ? (
                                    <Check className="w-4 h-4 text-green-400" />
                                ) : verdict ? (
                                    <X className="w-4 h-4 text-red-400" />
                                ) : (
                                    <FileText className="w-4 h-4" />
                                )}
                                Result
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                            {rightTab === 'testcase' && (
                                <div className="text-gray-400">
                                    <pre className="bg-gray-900/50 p-3 rounded">{problem.test_case_input || 'No sample input'}</pre>
                                </div>
                            )}
                            {rightTab === 'output' && (
                                <pre className={`${output.includes('Error') ? 'text-red-400' : 'text-gray-300'}`}>
                                    {output || 'Run your code to see output...'}
                                </pre>
                            )}
                            {rightTab === 'result' && (
                                <div>
                                    {verdict ? (
                                        <div className={`text-lg font-bold mb-3 ${verdict === 'Accepted' ? 'text-green-400' : 'text-red-400'}`}>
                                            {verdict}
                                        </div>
                                    ) : (
                                        <div className="text-gray-500">Submit your code to see results...</div>
                                    )}
                                    {testResults && testResults.length > 0 && (
                                        <div className="space-y-2">
                                            {testResults.map((tr, i) => (
                                                <div key={i} className={`flex items-center gap-2 p-2 rounded ${tr.status === 'Passed' ? 'bg-green-900/20' : 'bg-red-900/20'
                                                    }`}>
                                                    {tr.status === 'Passed' ? (
                                                        <Check className="w-4 h-4 text-green-400" />
                                                    ) : (
                                                        <X className="w-4 h-4 text-red-400" />
                                                    )}
                                                    <span className="text-gray-300">Test Case {i + 1}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestSolveProblem;
