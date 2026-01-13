import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import SimpleCodeEditor from '../components/SimpleCodeEditor';
import { Play, Send, ArrowLeft, CheckCircle, XCircle, Loader, ChevronRight, Code2, FileText, Terminal, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

import { useCodeContext } from '../contexts/CodeContext';

// Define boilerplates outside component to avoid recreation
const BOILERPLATES = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    
    return 0;
}`,
    python: `# Write your code here
def solve():
    pass

if __name__ == "__main__":
    solve()`,
    java: `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here
        
    }
}`
};

const SolveProblem = ({ setAuth }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { setCode: setGlobalCode, setProblemContext } = useCodeContext();
    const [problem, setProblem] = useState(null);
    const [language, setLanguage] = useState('cpp');
    const [code, setCode] = useState(BOILERPLATES.cpp);

    // Sync code to global context whenever it changes
    useEffect(() => {
        setGlobalCode(code);
    }, [code, setGlobalCode]);

    const [output, setOutput] = useState('');
    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [verdict, setVerdict] = useState(null);
    const [testResults, setTestResults] = useState([]);
    const [passedCount, setPassedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const [activeTab, setActiveTab] = useState('description');
    const [rightTab, setRightTab] = useState('testcase');
    const [submissions, setSubmissions] = useState([]);

    // Contest-related state
    const [contestId, setContestId] = useState(null);
    const [contestType, setContestType] = useState(null);
    const [contestProblems, setContestProblems] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);

    // Resizable split pane
    const [splitPos, setSplitPos] = useState(45);
    const containerRef = useRef(null);

    useEffect(() => {
        setCode(BOILERPLATES[language]);
        setVerdict(null);
        setOutput('');
        setTestResults([]);

        const params = new URLSearchParams(location.search);
        const contest = params.get('contest');
        const type = params.get('type');

        if (contest) {
            setContestId(contest);
            setContestType(type);
            fetchContestProblems(contest, type);
        }
        getProblem();
        if (localStorage.getItem("token")) {
            fetchSubmissions();
        }
    }, [id, location.search]);


    const handleLanguageChange = (e) => {
        const newLang = e.target.value;
        const currentBoilerplate = BOILERPLATES[language];

        if (code !== currentBoilerplate && code.trim() !== '') {
            if (!window.confirm("Switching language will reset your current code. Are you sure?")) {
                return;
            }
        }

        setLanguage(newLang);
        setCode(BOILERPLATES[newLang]);
    };


    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/problems/${id}/submissions`, {
                headers: { "token": token }
            });
            const data = await response.json();
            setSubmissions(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching submissions:", err);
            setSubmissions([]);
        }
    };

    const fetchContestProblems = async (contestId, type) => {
        try {
            const token = localStorage.getItem("token");
            let url = `${API_URL}/api/contests/${contestId}`;

            if (type === 'global') {
                url = `${API_URL}/api/contests/global/${contestId}`;
            }

            const response = await fetch(url, {
                headers: { "token": token }
            });
            const data = await response.json();
            setContestProblems(data.problems || []);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getProblem = async () => {
        try {
            const response = await fetch(`${API_URL}/api/problems/${id}`);
            const jsonData = await response.json();
            setProblem(jsonData);
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to load problem");
        }
    };

    const handleRun = async () => {
        setRunLoading(true);
        setOutput('');
        try {
            const body = { code, language, problem_id: id };
            const response = await fetch(`${API_URL}/api/execute/run`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if (parseRes.compile && parseRes.compile.code !== 0) {
                setOutput(`Compilation Error:\n${parseRes.compile.stderr}`);
            } else if (parseRes.run.code !== 0) {
                setOutput(`Runtime Error:\n${parseRes.run.stderr || 'Program crashed'}`);
            } else {
                const actualOutput = (parseRes.run?.stdout || '').trim();
                const expectedOutput = (parseRes.expected_output || '').trim();

                if (!parseRes.expected_output) {
                    setOutput(`⚠️ No test cases available\n\nYour code ran successfully:\n\nOutput:\n${actualOutput || '(no output)'}\n\nNote: Submit to validate against all test cases.`);
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
            console.error(err.message);
            toast.error("Execution failed");
            setOutput(`Error: ${err.message}`);
        }
        setRunLoading(false);
    };

    const handleSubmit = async () => {
        setSubmitLoading(true);
        setVerdict(null);
        setTestResults([]);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to submit");
                setSubmitLoading(false);
                return;
            }

            const body = { problem_id: id, code, language };
            const response = await fetch(`${API_URL}/api/execute/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.verdict === "Accepted") {
                setVerdict("Accepted");
                toast.success(`Perfect! Passed all ${parseRes.total_count} test cases!`);
                window.dispatchEvent(new Event('streakUpdated'));
            } else if (parseRes.verdict === "Compilation Error") {
                setVerdict("Compilation Error");
                toast.error("Compilation Error");
            } else if (parseRes.verdict === "Runtime Error") {
                setVerdict("Runtime Error");
                toast.error("Runtime Error");
            } else {
                setVerdict("Wrong Answer");
                toast.error(`Wrong Answer - Passed ${parseRes.passed_count}/${parseRes.total_count} test cases`);
            }

            setTestResults(parseRes.test_results || []);
            setPassedCount(parseRes.passed_count || 0);
            setTotalCount(parseRes.total_count || 0);
            setRightTab('result');

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

            if (contestId && parseRes.verdict === "Accepted") {
                fetchContestProblems(contestId, contestType);
            }

        } catch (err) {
            console.error(err.message);
            toast.error("Submission failed");
        }
        setSubmitLoading(false);
    };

    const handleBackClick = () => {
        if (contestId) {
            if (contestType === 'global') {
                navigate(`/contests/global/${contestId}`);
            } else {
                navigate(`/contests/${contestId}`);
            }
        } else {
            navigate('/problems');
        }
    };

    if (!problem) return (
        <div className="flex items-center justify-center h-screen bg-[#1a1a2e]">
            <Loader className="w-8 h-8 text-cyan-500 animate-spin" />
        </div>
    );

    return (
        <div className="h-screen bg-[#1a1a2e] text-gray-100 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-[#16162a] border-b border-gray-800 px-4 py-2 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={handleBackClick} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2">
                        <h1 className="font-semibold text-lg">{problem?.title}</h1>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${problem?.difficulty === 'Easy' ? 'bg-green-900/50 text-green-400' :
                            problem?.difficulty === 'Medium' ? 'bg-yellow-900/50 text-yellow-400' :
                                'bg-red-900/50 text-red-400'
                            }`}>
                            {problem?.difficulty}
                        </span>
                        {problem?.topic && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-900/50 text-blue-400">
                                {problem?.topic}
                            </span>
                        )}
                        {contestId && (
                            <span className="ml-2 px-2 py-0.5 bg-cyan-900/50 text-cyan-400 rounded text-xs font-medium">
                                Contest #{contestId}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-gray-400" />
                    <select
                        value={language}
                        onChange={handleLanguageChange}
                        className="bg-gray-800 text-gray-300 text-sm rounded-lg px-3 py-1.5 border border-gray-700 focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                        <option value="cpp">C++ 17</option>
                        <option value="python">Python 3</option>
                        <option value="java">Java 17</option>
                    </select>
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
            </header>

            {/* Main Content */}
            <div ref={containerRef} className="flex-1 flex overflow-hidden">
                {/* Contest Sidebar */}
                {contestId && contestProblems.length > 0 && showSidebar && (
                    <div className="w-64 border-r border-gray-800 bg-[#16162a] p-4 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-gray-300">Contest Problems</h3>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="text-gray-500 hover:text-gray-300"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {contestProblems.map((p, index) => (
                                <Link
                                    key={p.problem_id}
                                    to={`/problems/${p.problem_id}?contest=${contestId}&type=${contestType}`}
                                    className={`block p-3 rounded-lg transition ${p.problem_id === parseInt(id)
                                        ? 'bg-cyan-600 text-white'
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{String.fromCharCode(65 + index)}. {p.title}</span>
                                        {(p.solved || (verdict === 'Accepted' && p.problem_id === parseInt(id))) && (
                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                        )}
                                    </div>
                                    <span className={`text-xs ${p.difficulty === 'Easy' ? 'text-green-400' :
                                        p.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'
                                        }`}>
                                        {p.difficulty}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Toggle Sidebar Button */}
                {contestId && !showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="absolute left-0 top-20 bg-gray-800 p-2 rounded-r-lg hover:bg-gray-700 transition-colors z-10"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                )}

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
                            <Terminal className="w-4 h-4" />
                            Submissions
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {activeTab === 'description' ? (
                            <>
                                <div className="prose prose-invert max-w-none">
                                    {/* Parsed Problem Description - removes embedded examples/constraints */}
                                    <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                                        {(() => {
                                            let desc = problem.description || "No description available";
                                            // Remove everything after Example/Constraints/Sample to avoid duplication
                                            const cutPatterns = [
                                                /\n\*\*Example\s*\d*[:.]?\*\*/i,
                                                /\nExample\s*\d*[:.]?\s*\n/i,
                                                /\n\*\*Constraints[:.]?\*\*/i,
                                                /\nConstraints[:.]?\s*\n/i,
                                                /\nSample Input[:.]?\s*\n/i,
                                                /\nSample Output[:.]?\s*\n/i
                                            ];
                                            for (const pattern of cutPatterns) {
                                                const match = desc.match(pattern);
                                                if (match) {
                                                    desc = desc.substring(0, match.index);
                                                    break;
                                                }
                                            }
                                            return desc.trim();
                                        })()}
                                    </div>

                                    {/* Sample Test Case Box */}
                                    {problem.test_case_input && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-white mb-3">Sample Test Case</h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Input</div>
                                                    <pre className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto border border-gray-800">
                                                        {problem.test_case_input}
                                                    </pre>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide">Output</div>
                                                    <pre className="bg-gray-900 rounded-lg p-4 text-cyan-400 font-mono text-sm overflow-x-auto border border-gray-800">
                                                        {problem.test_case_output}
                                                    </pre>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Constraints Box */}
                                    {problem.constraints && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
                                            <div className="bg-gray-900 rounded-lg p-4 text-gray-300 font-mono text-sm border border-gray-800 whitespace-pre-wrap">
                                                {problem.constraints}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-white mb-4">My Submissions</h2>
                                {submissions.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        No submissions yet. Solve the problem to see your history!
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
                    <div className="flex-1 overflow-hidden">
                        <SimpleCodeEditor
                            value={code}
                            onChange={setCode}
                            language={language === 'python' ? 'python' : language === 'java' ? 'java' : 'cpp'}
                        />
                    </div>

                    {/* Output Panel with Tabs */}
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

export default SolveProblem;
