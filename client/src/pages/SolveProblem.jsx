import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import SimpleCodeEditor from '../components/SimpleCodeEditor';
import { Play, Send, ArrowLeft, CheckCircle, XCircle, Loader, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const SolveProblem = ({ setAuth }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState(`#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}`);
    const [output, setOutput] = useState('');
    const [runLoading, setRunLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [verdict, setVerdict] = useState(null);
    const [testResults, setTestResults] = useState([]);
    const [passedCount, setPassedCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    const [activeTab, setActiveTab] = useState('description');
    const [submissions, setSubmissions] = useState([]);

    // Contest-related state
    const [contestId, setContestId] = useState(null);
    const [contestProblems, setContestProblems] = useState([]);
    const [showSidebar, setShowSidebar] = useState(true);

    useEffect(() => {
        // Reset code to default template when problem changes
        setCode(`#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    
    return 0;
}`);
        setVerdict(null);
        setOutput('');

        // Check if we're coming from a contest
        const params = new URLSearchParams(location.search);
        const contest = params.get('contest');
        if (contest) {
            setContestId(contest);
            fetchContestProblems(contest);
        }
        getProblem();
        if (localStorage.getItem("token")) {
            fetchSubmissions();
        }
    }, [id, location.search]);

    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/problems/${id}/submissions`, {
                headers: { "token": token }
            });
            const data = await response.json();
            // Ensure data is always an array
            setSubmissions(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching submissions:", err);
            setSubmissions([]);
        }
    };

    const fetchContestProblems = async (contestId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/contests/${contestId}`, {
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
            console.log('Problem data received:', jsonData);
            console.log('Description length:', jsonData.description?.length);
            setProblem(jsonData);
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to load problem");
        }
    };

    const handleRun = async () => {
        setRunLoading(true);
        setOutput('');
        setVerdict(null);
        try {
            const body = { code, language: "cpp", problem_id: id };
            const response = await fetch(`${API_URL}/api/execute/run`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();

            if (parseRes.compile && parseRes.compile.code !== 0) {
                setOutput(`Compilation Error:\n${parseRes.compile.stderr}`);
                setVerdict('error');
            } else if (parseRes.run.code !== 0) {
                setOutput(`Runtime Error:\n${parseRes.run.stderr || 'Program crashed'}`);
                setVerdict('error');
            } else {
                // Safely handle potentially undefined values
                const actualOutput = (parseRes.run?.stdout || '').trim();
                const expectedOutput = (parseRes.expected_output || '').trim();

                // If no expected output is available, just show the actual output
                if (!parseRes.expected_output) {
                    setOutput(`⚠️ No test cases available\n\nYour code ran successfully:\n\nOutput:\n${actualOutput || '(no output)'}\n\nNote: Submit to validate against all test cases.`);
                    setVerdict(null);
                } else {
                    const passed = actualOutput === expectedOutput;
                    setVerdict(passed ? 'passed' : 'failed');

                    if (passed) {
                        setOutput(`✅ Sample Test Case Passed!\n\nInput:\n${problem.test_case_input}\n\nExpected Output:\n${expectedOutput}\n\nYour Output:\n${actualOutput}`);
                    } else {
                        setOutput(`❌ Sample Test Case Failed\n\nInput:\n${problem.test_case_input}\n\nExpected Output:\n${expectedOutput}\n\nYour Output:\n${actualOutput}`);
                    }
                }
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Execution failed");
            setOutput(`Error: ${err.message}`);
        }
        setRunLoading(false);
    };

    const handleSubmit = async () => {
        setSubmitLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to submit");
                setSubmitLoading(false);
                return;
            }

            const body = { problem_id: id, code, language: "cpp" };
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

        } catch (err) {
            console.error(err.message);
            toast.error("Submission failed");
        }
        setSubmitLoading(false);
    };

    const handleBackClick = () => {
        if (contestId) {
            navigate(`/contests/${contestId}`);
        } else {
            navigate('/problems');
        }
    };

    if (!problem) return (
        <div className="flex items-center justify-center h-screen bg-slate-900">
            <Loader className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            {/* Header*/}
            <div className="h-14 border-b border-slate-800 bg-slate-900/50 backdrop-blur flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <button onClick={handleBackClick} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    <div className="flex items-center gap-2">
                        <h1 className="font-semibold text-lg">{problem?.title}</h1>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${problem?.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                            problem?.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                'bg-red-500/10 text-red-500'
                            }`}>
                            {problem?.difficulty}
                        </span>
                        {contestId && (
                            <span className="ml-2 px-2 py-0.5 bg-blue-500/10 text-blue-500 rounded text-xs font-medium">
                                Contest #{contestId}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRun}
                        disabled={runLoading}
                        className="flex items-center gap-2 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        {runLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                        Run
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={submitLoading}
                        className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors text-sm font-medium disabled:opacity-50"
                    >
                        {submitLoading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        Submit
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Contest Sidebar */}
                {contestId && contestProblems.length > 0 && showSidebar && (
                    <div className="w-64 border-r border-slate-800 bg-slate-900/50 p-4 overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-semibold text-slate-300">Contest Problems</h3>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="text-slate-500 hover:text-slate-300"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-2">
                            {contestProblems.map((p, index) => (
                                <Link
                                    key={p.problem_id}
                                    to={`/problems/${p.problem_id}?contest=${contestId}`}
                                    className={`block p-3 rounded-lg transition ${p.problem_id === parseInt(id)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium text-sm">{String.fromCharCode(65 + index)}. {p.title}</span>
                                        {verdict === 'Accepted' && p.problem_id === parseInt(id) && (
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

                {/* Toggle Sidebar Button (when hidden) */}
                {contestId && !showSidebar && (
                    <button
                        onClick={() => setShowSidebar(true)}
                        className="absolute left-0 top-20 bg-slate-800 p-2 rounded-r-lg hover:bg-slate-700 transition-colors z-10"
                    >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                )}

                {/* Left Panel - Problem Description & Submissions */}
                <div className="w-1/2 border-r border-slate-800 flex flex-col bg-slate-900 overflow-hidden">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-800">
                        <button
                            onClick={() => setActiveTab('description')}
                            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'description'
                                ? 'text-blue-500 border-b-2 border-blue-500 bg-slate-800/50'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                                }`}
                        >
                            Description
                        </button>
                        <button
                            onClick={() => setActiveTab('submissions')}
                            className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'submissions'
                                ? 'text-blue-500 border-b-2 border-blue-500 bg-slate-800/50'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                                }`}
                        >
                            Submissions
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                        {activeTab === 'description' ? (
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-xl font-bold text-slate-200 mb-4">Description</h2>
                                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed mb-6">
                                    {problem.description || "No description available"}
                                </div>

                                {problem.test_case_input && (
                                    <div className="mt-6">
                                        <h3 className="text-sm font-semibold text-slate-200 mb-3">Sample Test Case</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <div className="text-xs text-slate-500 mb-1">Input</div>
                                                <div className="bg-slate-800/50 rounded-lg p-3 text-sm font-mono text-slate-300 whitespace-pre-wrap">
                                                    {problem.test_case_input}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-slate-500 mb-1">Output</div>
                                                <div className="bg-slate-800/50 rounded-lg p-3 text-sm font-mono text-slate-300 whitespace-pre-wrap">
                                                    {problem.test_case_output}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-slate-200 mb-4">My Submissions</h2>
                                {submissions.length === 0 ? (
                                    <div className="text-center py-8 text-slate-500">
                                        No submissions yet. Solve the problem to see your history!
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {submissions.map((sub) => (
                                            <div
                                                key={sub.submission_id}
                                                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                                            >
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${sub.status === 'Accepted' ? 'bg-green-500/20 text-green-400' :
                                                        sub.status === 'Compilation Error' ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {sub.status}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        {new Date(sub.submitted_at).toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded">
                                                        {sub.language}
                                                    </span>
                                                    <button
                                                        onClick={() => {
                                                            setCode(sub.code);
                                                            toast.info("Code loaded into editor");
                                                        }}
                                                        className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded transition-colors"
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

                {/* Right Panel - Code Editor & Output */}
                <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
                    <div className="flex-1 relative">
                        <SimpleCodeEditor
                            value={code}
                            onChange={setCode}
                            language="cpp"
                        />
                    </div>

                    {/* Output Panel */}
                    <div className="h-1/3 border-t border-slate-800 bg-slate-900 flex flex-col">
                        <div className="px-4 py-2 border-b border-slate-800 bg-slate-800/30 flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Output</span>
                            {verdict && (
                                <span className={`text-xs font-medium px-2 py-0.5 rounded ${verdict === 'Accepted' || verdict === 'passed' ? 'bg-green-500/10 text-green-500' :
                                    verdict === 'failed' || verdict === 'Wrong Answer' ? 'bg-red-500/10 text-red-500' :
                                        'bg-yellow-500/10 text-yellow-500'
                                    }`}>
                                    {verdict === 'passed' ? 'Accepted' :
                                        verdict === 'failed' ? 'Wrong Answer' :
                                            verdict}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 p-4 font-mono text-sm overflow-auto custom-scrollbar">
                            {output ? (
                                <pre className="whitespace-pre-wrap text-slate-300">{output}</pre>
                            ) : (
                                <div className="text-slate-600 italic">Run your code to see output...</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolveProblem;
