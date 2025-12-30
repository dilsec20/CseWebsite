import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config';
import { Plus, Calendar, Save, FileText, Code, Settings } from 'lucide-react';
import ContestLeaderboard from './ContestLeaderboard'; // Should check if this import is correct location but for now importing in App.js is cleaner.
// Re-reading intent: User wants leaderboard IN the separate section OR integrated. 
// "separate leader board fro evry contest"
// Let's integrate it into the GlobalContestArena as a tab or section.

const AdminContestManager = () => {
    const [contests, setContests] = useState([]);
    const [view, setView] = useState('list'); // list, create, view_contest, add_problem
    const [selectedContest, setSelectedContest] = useState(null);

    // Forms
    const [contestForm, setContestForm] = useState({ title: '', description: '', start_time: '', duration_minutes: 120 });
    const [problemForm, setProblemForm] = useState({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', source: '', test_cases_text: '' });

    const navigate = useNavigate();

    useEffect(() => {
        fetchContests();
    }, []);

    const fetchContests = async () => {
        try {
            const res = await fetch(`${API_URL}/contests/global/all`, {
                headers: { token: localStorage.getItem('token') }
            });
            const data = await res.json();
            setContests(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleCreateContest = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting contest:", contestForm);
            const res = await fetch(`${API_URL}/admin/contests/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                body: JSON.stringify(contestForm)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Contest created!");
                fetchContests();
                setView('list');
            } else {
                throw new Error(data.error || "Failed to create contest");
            }
        } catch (err) {
            console.error("Create contest error:", err);
            toast.error(err.message);
        }
    };

    const handleAddProblem = async (e) => {
        e.preventDefault();
        try {
            // 1. Create Problem
            const problemRes = await fetch(`${API_URL}/admin/contests/problems/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') }, // Fixed endpoint path
                body: JSON.stringify({ ...problemForm, contest_id: selectedContest.contest_id })
            });

            if (!problemRes.ok) throw new Error("Problem creation failed");
            const problemData = await problemRes.json();
            const problemId = problemData.problem_id;

            // 2. Parse and Add Test Cases
            // Expected format: Input:::Output|||Input:::Output
            // A simple parser for manual entry
            // Or better: JSON array text

            let testCases = [];
            try {
                // Try JSON parsing first
                testCases = JSON.parse(problemForm.test_cases_text);
            } catch {
                // Fallback to simple parser: Case 1 Input --- Case 1 Output === Case 2 Input ---...
                // Only if JSON fails. For now, let's enforce JSON array for simplicity in MVP
                // [{ "input": "...", "expected_output": "...", "is_sample": true }]
                toast.error("Test cases must be valid JSON array");
                return;
            }

            const tcRes = await fetch(`${API_URL}/admin/contests/test-cases/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                body: JSON.stringify({ problem_id: problemId, test_cases: testCases })
            });

            if (tcRes.ok) {
                toast.success("Problem & Test Cases added!");
                setView('list');
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                    <FileText className="w-8 h-8 text-blue-600" /> Contest Manager
                </h1>
                <button
                    onClick={() => navigate('/admin')}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                    Back to Dashboard
                </button>
            </div>

            {/* LIST VIEW */}
            {view === 'list' && (
                <div>
                    <button
                        onClick={() => setView('create')}
                        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                    >
                        <Plus size={20} /> Create Contest
                    </button>

                    <div className="grid gap-4">
                        {contests.map(c => (
                            <div key={c.contest_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group hover:shadow-md transition">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">{c.title}</h3>
                                    <p className="text-gray-500 text-sm mt-1">
                                        {new Date(c.start_time).toLocaleString()} • {Math.round((new Date(c.end_time) - new Date(c.start_time)) / 60000)} mins
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={async () => {
                                            if (!window.confirm("Finalize contest and update ratings? Cannot be undone.")) return;
                                            try {
                                                const res = await fetch(`${API_URL}/admin/contests/${c.contest_id}/finalize`, {
                                                    method: 'POST',
                                                    headers: { token: localStorage.getItem('token') }
                                                });
                                                if (res.ok) toast.success("Ratings updated!");
                                                else toast.error("Failed to finalize");
                                            } catch (e) { toast.error("Error finalizing"); }
                                        }}
                                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200"
                                    >
                                        Finalize
                                    </button>
                                    <button
                                        onClick={() => { setSelectedContest(c); setView('add_problem'); }}
                                        className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-200"
                                    >
                                        + Add Problem
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CREATE CONTEST VIEW */}
            {view === 'create' && (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6">Create New Contest</h2>
                    <form onSubmit={handleCreateContest} className="space-y-4">
                        <input className="w-full p-3 border rounded-lg" placeholder="Contest Title" value={contestForm.title} onChange={e => setContestForm({ ...contestForm, title: e.target.value })} required />
                        <textarea className="w-full p-3 border rounded-lg" placeholder="Description" rows={3} value={contestForm.description} onChange={e => setContestForm({ ...contestForm, description: e.target.value })} />
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Start Time</label>
                                <input type="datetime-local" className="w-full p-3 border rounded-lg" value={contestForm.start_time} onChange={e => setContestForm({ ...contestForm, start_time: e.target.value })} required />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Duration (mins)</label>
                                <input type="number" className="w-full p-3 border rounded-lg" value={contestForm.duration_minutes} onChange={e => setContestForm({ ...contestForm, duration_minutes: e.target.value })} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setView('list')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Create Contest</button>
                        </div>
                    </form>
                </div>
            )}

            {/* ADD PROBLEM VIEW */}
            {view === 'add_problem' && (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-2xl font-bold mb-2">Add Problem</h2>
                    <p className="text-gray-500 mb-6">To: {selectedContest?.title}</p>

                    <form onSubmit={handleAddProblem} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Problem Details</h3>
                            <input className="w-full p-3 border rounded-lg" placeholder="Problem Title" value={problemForm.title} onChange={e => setProblemForm({ ...problemForm, title: e.target.value })} required />
                            <select className="w-full p-3 border rounded-lg" value={problemForm.difficulty} onChange={e => setProblemForm({ ...problemForm, difficulty: e.target.value })}>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                            <input className="w-full p-3 border rounded-lg" placeholder="Topic (e.g. Arrays)" value={problemForm.topic} onChange={e => setProblemForm({ ...problemForm, topic: e.target.value })} />
                            <textarea className="w-full p-3 border rounded-lg" placeholder="Description (Markdown supported)" rows={6} value={problemForm.description} onChange={e => setProblemForm({ ...problemForm, description: e.target.value })} required />
                            <textarea className="w-full p-3 border rounded-lg" placeholder="Constraints (e.g. 1 <= N <= 10^5)" rows={2} value={problemForm.constraints} onChange={e => setProblemForm({ ...problemForm, constraints: e.target.value })} />
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Test Cases (JSON)</h3>
                            <div className="text-sm text-gray-600 mb-2 bg-blue-50 p-2 rounded border border-blue-100">
                                <p><strong>Single List for All Cases:</strong> Combine both sample (visible) and hidden (submit) test cases into one JSON array below.</p>
                                <ul className="list-disc pl-4 mt-1 text-xs">
                                    <li><code>"is_sample": true</code> → Visible when user clicks 'Run'</li>
                                    <li><code>"is_sample": false</code> → Hidden, used only for 'Submit' grading</li>
                                </ul>
                            </div>
                            <p className="text-xs text-gray-400">
                                Example Format: <br />
                                <code className="bg-gray-100 p-1 rounded block mt-1">
                                    [<br />
                                    &#123; "input": "2\n1 2", "expected_output": "3", "is_sample": true &#125;,<br />
                                    &#123; "input": "5\n1 2 3 4 5", "expected_output": "15", "is_sample": false &#125;<br />
                                    ]
                                </code>
                            </p>
                            <textarea
                                className="w-full p-3 border rounded-lg font-mono text-sm bg-gray-50"
                                placeholder="Paste JSON test cases here..."
                                rows={15}
                                value={problemForm.test_cases_text}
                                onChange={e => setProblemForm({ ...problemForm, test_cases_text: e.target.value })}
                                required
                            />

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setView('list')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
                                    <Save size={18} /> Save Problem
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminContestManager;
