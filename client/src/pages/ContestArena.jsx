import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';

const ContestArena = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [session, setSession] = useState(null);
    const [problems, setProblems] = useState([]);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        const getContest = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:5000/api/contests/${id}`, {
                    headers: { "token": token }
                });
                const data = await response.json();
                setSession(data.session);
                setProblems(data.problems);

                // Calculate initial time left
                const end = new Date(data.session.end_time).getTime();
                const now = new Date().getTime();
                setTimeLeft(Math.max(0, Math.floor((end - now) / 1000)));

            } catch (err) {
                console.error(err.message);
            }
        };
        getContest();
    }, [id]);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const finishContest = async () => {
        try {
            const token = localStorage.getItem("token");
            await fetch(`http://localhost:5000/api/contests/${id}/finish`, {
                method: "POST",
                headers: { "token": token }
            });
            toast.success("Contest finished!");
            navigate('/contests');
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to finish contest");
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const [solvedProblems, setSolvedProblems] = useState(new Set());
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchSolvedStatus = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const response = await fetch("http://localhost:5000/api/problems/solved", {
                    headers: { "token": token }
                });
                const data = await response.json();
                const solvedSet = new Set(data.map(p => p.problem_id));
                setSolvedProblems(solvedSet);

                // Calculate score
                let currentScore = 0;
                problems.forEach(p => {
                    if (solvedSet.has(p.problem_id)) {
                        if (p.difficulty === 'Easy') currentScore += 20;
                        else if (p.difficulty === 'Medium') currentScore += 40;
                        else if (p.difficulty === 'Hard') currentScore += 80;
                    }
                });
                setScore(currentScore);

            } catch (err) {
                console.error("Error fetching solved status:", err);
            }
        };

        if (problems.length > 0) {
            fetchSolvedStatus();
        }
    }, [problems]);

    if (!session) return <div className="p-8">Loading Contest...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header with Timer */}
            <header className="bg-gray-900 text-white p-4 sticky top-0 z-10 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-bold">Contest #{session.session_id}</h1>
                        <p className="text-gray-400 text-xs">5 Problems | 2 Hours</p>
                    </div>
                    <div className={`text-3xl font-mono font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={finishContest}
                        className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm font-bold"
                    >
                        Finish Contest
                    </button>
                </div>
            </header>

            <div className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Problem List */}
                <div className="lg:col-span-2 space-y-4">
                    {problems.map((problem, index) => (
                        <div key={problem.problem_id} className={`p-6 rounded-lg shadow-sm border transition ${solvedProblems.has(problem.problem_id)
                                ? 'bg-green-50 border-green-200'
                                : 'bg-white border-gray-200 hover:border-blue-300'
                            }`}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                                        {String.fromCharCode(65 + index)}. {problem.title}
                                        {solvedProblems.has(problem.problem_id) && (
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                        )}
                                    </h3>
                                    <div className="flex space-x-2 mt-2">
                                        <span className={`px-2 py-0.5 text-xs rounded-full ${problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                                            problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {problem.difficulty}
                                        </span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            {problem.topic}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    to={`/problems/${problem.problem_id}?contest=${id}`}
                                    className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${solvedProblems.has(problem.problem_id)
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                                        }`}
                                >
                                    {solvedProblems.has(problem.problem_id) ? 'Solved' : 'Solve'}
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar / Scoreboard */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4">Contest Progress</h3>
                        <div className="space-y-4">
                            {problems.map((p, i) => (
                                <div key={p.problem_id} className="flex items-center justify-between text-sm">
                                    <span className={solvedProblems.has(p.problem_id) ? "text-green-700 font-medium" : "text-gray-600"}>
                                        Problem {String.fromCharCode(65 + i)}
                                    </span>
                                    {solvedProblems.has(p.problem_id) ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : (
                                        <Circle className="h-5 w-5 text-gray-300" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Current Score</span>
                                <span className="text-2xl font-bold text-blue-600">{score}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1 text-right">
                                Easy: 20 | Medium: 40 | Hard: 80
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestArena;
