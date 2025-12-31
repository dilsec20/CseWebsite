import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Zap, Play, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const ContestDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('events'); // events | practice
    const [globalContests, setGlobalContests] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch Global Contests
    React.useEffect(() => {
        const fetchGlobal = async () => {
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { token } : {};

                const res = await fetch(`${API_URL}/api/contests/global/all`, {
                    headers: headers
                });
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setGlobalContests(data);
                    } else {
                        console.error("Expected array but got:", data);
                        setGlobalContests([]);
                    }
                } else {
                    console.error("Failed to fetch contests");
                    setGlobalContests([]);
                }
            } catch (err) {
                console.error(err);
                setGlobalContests([]);
            }
        };
        fetchGlobal();
    }, []);

    const checkLogin = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first!", {
                theme: "colored"
            });
            return false;
        }
        return true;
    };

    const startMockContest = async () => {
        if (!checkLogin()) return;

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/contests/start`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "token": token }
            });

            if (!response.ok) {
                const errorMsg = await response.json();
                throw new Error(errorMsg.error || "Failed");
            }

            const data = await response.json();
            navigate(`/contests/${data.session_id}`);
        } catch (err) {
            console.error(err.message);
            toast.error(err.message || "Failed to start contest");
        } finally {
            setLoading(false);
        }
    };

    const registerForContest = async (id) => {
        if (!checkLogin()) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/contests/global/${id}/register`, {
                method: 'POST',
                headers: { token }
            });
            if (res.ok) {
                toast.success("Registered successfully!");
                // Refresh list to update UI
                const updatedContests = globalContests.map(c =>
                    c.contest_id === id ? { ...c, is_registered: true } : c
                );
                setGlobalContests(updatedContests);
            }
        } catch (err) {
            toast.error("Registration failed");
        }
    };

    const unregisterForContest = async (id) => {
        if (!checkLogin()) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/contests/global/${id}/unregister`, {
                method: 'POST', // or DELETE if you changed backend, but currently POST
                headers: { token }
            });
            if (res.ok) {
                toast.warning("Unregistered from contest");
                // Refresh list
                const updatedContests = globalContests.map(c =>
                    c.contest_id === id ? { ...c, is_registered: false } : c
                );
                setGlobalContests(updatedContests);
            }
        } catch (err) {
            toast.error("Unregistration failed");
        }
    };

    const handlePracticeClick = (contestId) => {
        if (checkLogin()) {
            navigate(`/contests/global/${contestId}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contest Arena</h1>
                    <p className="text-xl text-gray-600">Compete with others or practice solo.</p>
                </div>

                {/* TABS */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-xl shadow-sm inline-flex">
                        <button
                            onClick={() => setActiveTab('events')}
                            className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'events' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Live Events
                        </button>
                        <button
                            onClick={() => setActiveTab('past')}
                            className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'past' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Past Events
                        </button>
                        <button
                            onClick={() => setActiveTab('practice')}
                            className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'practice' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                        >
                            Mock Practice
                        </button>
                    </div>
                </div>

                {/* LIVE EVENTS TAB */}
                {activeTab === 'events' && (
                    <div className="space-y-4">
                        {!Array.isArray(globalContests) || globalContests.filter(c => new Date(c.end_time) > new Date()).length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                <Trophy className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                <h3 className="text-lg font-medium text-gray-900">No scheduled contests</h3>
                                <p className="text-gray-500">Check back later for upcoming global events.</p>
                            </div>
                        ) : (
                            globalContests.filter(c => new Date(c.end_time) > new Date()).map(contest => {
                                const now = new Date();
                                const start = new Date(contest.start_time);
                                const end = new Date(contest.end_time);
                                let status = 'upcoming';
                                if (now >= start && now < end) status = 'live';

                                return (
                                    <div key={contest.contest_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 transition hover:shadow-md">
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-xl font-bold text-gray-900">{contest.title}</h3>
                                                {status === 'live' && <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-bold rounded animate-pulse">LIVE</span>}
                                                {status === 'upcoming' && <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-xs font-bold rounded">UPCOMING</span>}
                                                {contest.is_registered && <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded flex items-center gap-1">REGISTERED</span>}
                                            </div>
                                            <p className="text-gray-500 text-sm mb-2">{contest.description}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {start.toLocaleString()}</span>
                                                <span className="flex items-center gap-1"><Clock size={14} /> {Math.round((end - start) / 60000)} mins</span>
                                                {status !== 'past' && (
                                                    <span className="flex items-center gap-1" title="Registered Participants">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                                        {contest.participant_count || 0}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            {/* Button Logic */}
                                            {status === 'live' ? (
                                                contest.is_registered ? (
                                                    <button
                                                        onClick={() => handlePracticeClick(contest.contest_id)}
                                                        className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 shadow-lg shadow-red-200"
                                                    >
                                                        Enter Contest
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => registerForContest(contest.contest_id)}
                                                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                                                    >
                                                        Register to Enter
                                                    </button>
                                                )
                                            ) : (
                                                // UPCOMING
                                                contest.is_registered ? (
                                                    <button
                                                        onClick={() => unregisterForContest(contest.contest_id)}
                                                        className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200"
                                                    >
                                                        Unregister
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => registerForContest(contest.contest_id)}
                                                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
                                                    >
                                                        Register
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}

                {/* PAST EVENTS TAB */}
                {activeTab === 'past' && (
                    <div className="space-y-4">
                        {!Array.isArray(globalContests) || globalContests.filter(c => new Date(c.end_time) <= new Date()).length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                                <Clock className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                                <h3 className="text-lg font-medium text-gray-900">No past contests</h3>
                                <p className="text-gray-500">Completed contests will appear here.</p>
                            </div>
                        ) : (
                            globalContests
                                .filter(c => new Date(c.end_time) <= new Date())
                                .sort((a, b) => new Date(b.end_time) - new Date(a.end_time))
                                .map(contest => {
                                    return (
                                        <div key={contest.contest_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 transition hover:shadow-md opacity-75 hover:opacity-100">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <h3 className="text-xl font-bold text-gray-800">{contest.title}</h3>
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-bold rounded">ENDED</span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1"><Calendar size={14} /> Ended on {new Date(contest.end_time).toLocaleDateString()}</span>
                                                </div>
                                            </div>

                                            <div>
                                                <button
                                                    onClick={() => handlePracticeClick(contest.contest_id)}
                                                    className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                                                >
                                                    Practice
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                        )}
                    </div>
                )}

                {/* PRACTICE TAB (Old Content) */}
                {activeTab === 'practice' && (
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white text-center">
                            <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
                            <h2 className="text-3xl font-bold mb-2">Mock Interview Mode</h2>
                            <p className="opacity-90">Simulate a real coding interview environment.</p>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Zap className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Random Set</h3>
                                    <p className="text-sm text-gray-500">1 Easy, 2 Medium, 2 Hard problems generated instantly.</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Clock className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Time Limit</h3>
                                    <p className="text-sm text-gray-500">Strict 2-hour timer to keep you focused and efficient.</p>
                                </div>
                                <div className="text-center p-4 bg-gray-50 rounded-xl">
                                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Trophy className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Instant Results</h3>
                                    <p className="text-sm text-gray-500">Real-time code execution and scoring.</p>
                                </div>
                            </div>

                            <button
                                onClick={startMockContest}
                                disabled={loading}
                                className="w-full py-4 bg-gray-900 text-white text-xl font-bold rounded-xl hover:bg-gray-800 transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                            >
                                {loading ? "Generating Contest..." : (
                                    <>
                                        <Play className="mr-2 h-6 w-6" /> Start New Mock Contest
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContestDashboard;
