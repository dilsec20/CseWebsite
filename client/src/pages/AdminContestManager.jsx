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

    // New State for Management
    const [contestProblems, setContestProblems] = useState([]);
    const [editingProblemId, setEditingProblemId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchContests();
    }, []);

    const fetchContests = async () => {
        try {
            const url = `${API_URL}/api/contests/global/all`;
            console.log("Fetching contests from:", url);
            const res = await fetch(url, {
                headers: { token: localStorage.getItem('token') }
            });
            if (!res.ok) {
                console.error("Fetch contests failed:", res.status, await res.text());
                return;
            }
            const data = await res.json();
            setContests(data);
        } catch (err) {
            console.error("Error fetching contests:", err);
        }
    };

    const fetchContestProblems = async (contestId) => {
        try {
            const res = await fetch(`${API_URL}/api/admin/contests/${contestId}/problems`, {
                headers: { token: localStorage.getItem('token') }
            });
            console.log(`[DEBUG] Fetching problems for contest ${contestId}: Status ${res.status}`);
            if (res.ok) {
                const data = await res.json();
                console.log("[DEBUG] Problems fetched:", data);
                setContestProblems(data);
            } else {
                console.error("Failed to fetch problems, status:", res.status);
            }
        } catch (err) {
            console.error("Failed to fetch problems", err);
        }
    };

    const handleCreateContest = async (e) => {
        e.preventDefault();
        const url = `${API_URL}/api/admin/contests/create`;
        console.log("Attempting to fetch:", url);
        console.log("Payload:", contestForm);

        try {
            console.log("Submitting contest:", contestForm);
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                body: JSON.stringify(contestForm)
            });

            console.log("Response Status:", res.status, res.statusText);
            const contentType = res.headers.get("content-type");
            console.log("Response Content-Type:", contentType);

            let data;
            const text = await res.text(); // Get raw text first
            console.log("Raw Response Body:", text);

            try {
                data = JSON.parse(text);
            } catch (jsonErr) {
                console.error("JSON Parse Error:", jsonErr);
                console.error("Failed to parse response text:", text);
                throw new Error(`Server returned non-JSON response (${res.status}). Check console for details.`);
            }

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
            let problemId;

            if (editingProblemId) {
                // UPDATE Existing Problem
                const res = await fetch(`${API_URL}/api/admin/contests/problems/${editingProblemId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                    body: JSON.stringify(problemForm)
                });

                if (!res.ok) throw new Error("Problem update failed");
                const data = await res.json();
                problemId = data.problem_id;
                toast.success("Problem updated!");
            } else {
                // CREATE New Problem
                const problemRes = await fetch(`${API_URL}/api/admin/contests/problems/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') }, // Fixed endpoint path
                    body: JSON.stringify({ ...problemForm, contest_id: selectedContest.contest_id })
                });

                if (!problemRes.ok) throw new Error("Problem creation failed");
                const problemData = await problemRes.json();
                problemId = problemData.problem_id;
            }

            // 2. Parse and Add Test Cases
            // Only add test cases logic here (simplified)
            // If editing, we skip updating test cases for now as requested/planned, unless it's a new problem logic or separate tool.
            // But let's keep the original logic for NEW problems, and maybe skip for edit unless we want to support it (plan said "Optional").

            if (!editingProblemId && problemForm.test_cases_text) {
                let testCases = [];
                try {
                    testCases = JSON.parse(problemForm.test_cases_text);
                } catch {
                    // Fallback/Ignore if empty
                }

                if (testCases.length > 0) {
                    const tcRes = await fetch(`${API_URL}/api/admin/contests/test-cases/add`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', token: localStorage.getItem('token') },
                        body: JSON.stringify({ problem_id: problemId, test_cases: testCases })
                    });
                    if (tcRes.ok) toast.success("Test Cases added!");
                }
            } else if (!editingProblemId) {
                toast.success("Problem added (No test cases)");
            }

            // Refresh list and clear form
            fetchContestProblems(selectedContest.contest_id);
            setEditingProblemId(null);
            setProblemForm({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', source: '', test_cases_text: '' });
            // Stay in add_problem view to see the list update

        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleDeleteProblem = async () => {
        if (!editingProblemId || !window.confirm("Are you sure you want to delete this problem?")) return;

        try {
            const res = await fetch(`${API_URL}/api/admin/contests/problems/${editingProblemId}`, {
                method: 'DELETE',
                headers: { token: localStorage.getItem('token') }
            });

            if (res.ok) {
                toast.success("Problem deleted");
                fetchContestProblems(selectedContest.contest_id);
                setEditingProblemId(null);
                setProblemForm({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', source: '', test_cases_text: '' });
            } else {
                toast.error("Failed to delete problem");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error deleting problem");
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
                                        onClick={() => {
                                            setEditingContestId(c.contest_id);
                                            // Pre-fill form
                                            const start = new Date(c.start_time);
                                            const end = new Date(c.end_time);
                                            const duration = Math.round((end - start) / 60000);

                                            // Format start_time for datetime-local input (YYYY-MM-DDTHH:mm)
                                            // Note: This needs local time adjustment
                                            const offset = start.getTimezoneOffset() * 60000;
                                            const localISOTime = new Date(start.getTime() - offset).toISOString().slice(0, 16);

                                            setContestForm({
                                                title: c.title,
                                                description: c.description,
                                                start_time: localISOTime,
                                                duration_minutes: duration
                                            });
                                            setView('create');
                                        }}
                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!window.confirm("Are you sure you want to delete this contest?")) return;
                                            try {
                                                const res = await fetch(`${API_URL}/api/admin/contests/${c.contest_id}`, {
                                                    method: 'DELETE',
                                                    headers: { token: localStorage.getItem('token') }
                                                });
                                                if (res.ok) {
                                                    toast.success("Contest deleted");
                                                    fetchContests();
                                                } else {
                                                    toast.error("Failed to delete contest");
                                                }
                                            } catch (e) {
                                                toast.error("Error deleting contest");
                                            }
                                        }}
                                        className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200"
                                    >
                                        Delete
                                    </button>
                                    {new Date() > new Date(c.end_time) && (
                                        <button
                                            onClick={async () => {
                                                if (!window.confirm("Calculate rankings and update user ratings?")) return;
                                                try {
                                                    const res = await fetch(`${API_URL}/api/admin/contests/${c.contest_id}/finalize`, {
                                                        method: 'POST',
                                                        headers: { token: localStorage.getItem('token') }
                                                    });
                                                    const data = await res.json();
                                                    if (res.ok) toast.success(data.message || "Ratings updated!");
                                                    else toast.error(data.error || "Failed to finalize");
                                                } catch (e) {
                                                    console.error(e);
                                                    toast.error("Error finalizing contest");
                                                }
                                            }}
                                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-purple-200"
                                        >
                                            Calculate Ratings
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setSelectedContest(c);
                                            fetchContestProblems(c.contest_id);
                                            // Reset form when opening
                                            setProblemForm({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', source: '', test_cases_text: '' });
                                            setEditingProblemId(null);
                                            setView('add_problem');
                                        }}
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

            {/* CREATE/EDIT CONTEST VIEW */}
            {view === 'create' && (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 max-w-2xl">
                    <h2 className="text-2xl font-bold mb-6">{editingContestId ? "Edit Contest" : "Create New Contest"}</h2>
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

            {/* ADD PROBLEM VIEW (Now Manage/Edit View) */}
            {view === 'add_problem' && (
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold">Manage Contest</h2>
                            <p className="text-gray-500">{selectedContest?.title}</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingProblemId(null);
                                setProblemForm({ title: '', description: '', difficulty: 'Medium', topic: '', constraints: '', source: '', test_cases_text: '' });
                            }}
                            className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100"
                        >
                            + New Problem
                        </button>
                    </div>

                    {/* Problem List */}
                    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {console.log("[DEBUG] Rendering problems:", contestProblems)}
                        {contestProblems.length === 0 && <p className="text-gray-500 col-span-full">No problems added yet.</p>}
                        {contestProblems.map(p => (
                            <div
                                key={p.problem_id}
                                onClick={() => {
                                    setEditingProblemId(p.problem_id);
                                    setProblemForm({ ...p, test_cases_text: '' }); // Load problem data, reset test cases (we don't fetch them yet)
                                }}
                                className={`p-4 rounded-lg border cursor-pointer transition ${editingProblemId === p.problem_id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-gray-200 hover:border-blue-300'}`}
                            >
                                <h4 className="font-bold text-gray-800">{p.title}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                                    {p.difficulty}
                                </span>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold mb-4 border-b pb-2">
                        {editingProblemId ? `Edit Problem: ${problemForm.title}` : "Add New Problem"}
                    </h3>

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
                            <input className="w-full p-3 border rounded-lg" placeholder="Source (Optional)" value={problemForm.source || ''} onChange={e => setProblemForm({ ...problemForm, source: e.target.value })} />
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
                                placeholder={editingProblemId ? "Leave empty to keep existing test cases (Updating test cases not supported in edit mode yet)" : "Paste JSON test cases here..."}
                                rows={15}
                                value={problemForm.test_cases_text}
                                onChange={e => setProblemForm({ ...problemForm, test_cases_text: e.target.value })}
                            />

                            <div className="flex justify-end gap-3 mt-6">
                                <button type="button" onClick={() => setView('list')} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2">
                                    <Save size={18} /> {editingProblemId ? "Update Problem" : "Save Problem"}
                                </button>
                            </div>
                            {editingProblemId && (
                                <button
                                    type="button"
                                    onClick={handleDeleteProblem}
                                    className="w-full mt-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-sm"
                                >
                                    Delete This Problem
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminContestManager;
