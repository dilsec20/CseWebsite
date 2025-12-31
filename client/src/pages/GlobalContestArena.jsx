import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Circle, ArrowRight, AlertTriangle, List } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';
import ContestLeaderboard from './ContestLeaderboard';

const GlobalContestArena = () => {
    const { id } = useParams(); // Global Contest ID
    const [contest, setContest] = useState(null);
    const [problems, setProblems] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    const [score, setScore] = useState(0);
    const [activeTab, setActiveTab] = useState('arena'); // arena | leaderboard

    useEffect(() => {
        const fetchContest = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_URL}/api/contests/global/${id}`, {
                    headers: { token }
                });

                if (!res.ok) throw new Error("Failed to load contest");

                const data = await res.json();
                setContest(data.contest);
                setProblems(data.problems);
                setIsRegistered(data.is_registered);
                setHasStarted(data.has_started);

                // Fetch participation score if registered
                if (data.is_registered) {
                    const partRes = await fetch(`${API_URL}/api/contests/global/${id}/participation`, { headers: { token } });
                    if (partRes.ok) {
                        const partData = await partRes.json();
                        setScore(partData.score);
                    }
                }

                // Calculate timer
                const now = new Date();
                const start = new Date(data.contest.start_time);
                const end = new Date(data.contest.end_time);

                if (now < start) {
                    // Time until start
                    setTimeLeft(Math.floor((start - now) / 1000));
                } else if (now < end) {
                    // Time until end
                    setTimeLeft(Math.floor((end - now) / 1000));
                } else {
                    setTimeLeft(0);
                }

            } catch (err) {
                console.error(err);
                toast.error("Could not load contest details");
            }
        };
        fetchContest();
    }, [id]);

    // Timer Logic
    useEffect(() => {
        if (timeLeft === null) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    // Refresh page/state when timer hits 0 (Start time reached or End time reached)
                    // Ideally fetchContest() again but simple countdown stop is fine for now
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        if (seconds < 0) return "00:00:00";
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (!contest) return <div className="p-8 text-center">Loading Contest...</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{contest.title}</h1>
                        <p className="text-gray-500 text-sm">{contest.description}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-500 mb-1">
                            {!hasStarted ? "Starts in" : timeLeft > 0 ? "Time Remaining" : "Contest Ended"}
                        </div>
                        <div className={`text-3xl font-mono font-bold ${!hasStarted ? 'text-blue-600' : timeLeft > 0 ? 'text-green-600' : 'text-gray-400'}`}>
                            {formatTime(timeLeft)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-7xl mx-auto w-full p-6">
                {!isRegistered && timeLeft > 0 ? (
                    <div className="text-center py-20">
                        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">You are not registered</h2>
                        <p className="text-gray-600 mb-6">You must register for this contest to participate.</p>
                        <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700">Register Now</button>
                    </div>
                ) : !hasStarted && timeLeft > 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                        <Clock className="mx-auto h-16 w-16 text-blue-500 mb-4 animate-pulse" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contest Has Not Started</h2>
                        <p className="text-gray-600">Please wait for the countdown to finish. The problems will appear here automatically.</p>
                    </div>
                ) : (
                    <div>
                        {/* Arena Tabs */}
                        <div className="flex gap-4 border-b mb-6">
                            <button
                                onClick={() => setActiveTab('arena')}
                                className={`px-4 py-2 font-medium border-b-2 transition ${activeTab === 'arena' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Problems
                            </button>
                            <button
                                onClick={() => setActiveTab('leaderboard')}
                                className={`px-4 py-2 font-medium border-b-2 transition ${activeTab === 'leaderboard' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                            >
                                Leaderboard
                            </button>
                        </div>

                        {activeTab === 'leaderboard' ? (
                            <ContestLeaderboard />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                {/* Problems List */}
                                <div className="md:col-span-3 space-y-4">
                                    {problems.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">No problems available.</div>
                                    ) : problems.map((p, i) => (
                                        <div key={p.problem_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-400 transition group">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm group-hover:bg-blue-100 group-hover:text-blue-700 transition">
                                                            {String.fromCharCode(65 + i)}
                                                        </span>
                                                        {p.title}
                                                    </h3>
                                                    <div className="flex gap-2">
                                                        <span className={`text-xs px-2 py-1 rounded-full ${p.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                                            p.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {p.difficulty}
                                                        </span>
                                                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded-full">{p.topic}</span>
                                                    </div>
                                                </div>
                                                <Link
                                                    to={`/problems/${p.problem_id}`}
                                                    className="px-6 py-2 bg-gray-50 text-gray-700 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition"
                                                >
                                                    Solve
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                                        <h3 className="font-bold text-gray-900 mb-4">Contest Status</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Problems</span>
                                                <span className="font-medium">{problems.length}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">My Score</span>
                                                <span className="font-medium text-green-600">{score}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlobalContestArena;
