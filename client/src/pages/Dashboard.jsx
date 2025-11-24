import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
    LayoutDashboard,
    Code,
    BookOpen,
    Trophy,
    LogOut,
    CheckCircle,
    Clock,
    Zap,
    TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';

const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");
    const [stats, setStats] = useState({
        problems_solved: 0,
        current_streak: 0,
        hours_spent: 0,
        total_submissions: 0
    });
    const [progress, setProgress] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [ratingHistory, setRatingHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDashboardData = async () => {
        try {
            const response = await fetch("http://localhost:5000/dashboard/", {
                headers: { token: localStorage.getItem("token") }
            });
            const parseRes = await response.json();

            if (parseRes.user_name) {
                setName(parseRes.user_name);
                setStats(parseRes.stats);
                setProgress(parseRes.progress.slice(0, 3)); // Top 3 topics
                setRecommended(parseRes.recommended_problems.slice(0, 3)); // Top 3 recommendations
                setRatingHistory(parseRes.rating_history || []);
            }
            setLoading(false);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    };

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    const getRatingColor = (rating) => {
        if (rating >= 1000) return 'text-red-600';
        if (rating >= 800) return 'text-purple-600';
        if (rating >= 500) return 'text-blue-600';
        if (rating >= 300) return 'text-green-600';
        return 'text-gray-600';
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                        <Code className="h-6 w-6" /> PrepPortal
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium">
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                    </Link>
                    <Link to="/problems" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <Code className="h-5 w-5" /> Problems
                    </Link>
                    <Link to="/knowledge-base" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <BookOpen className="h-5 w-5" /> Knowledge Base
                    </Link>
                    <Link to="/contests" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <Trophy className="h-5 w-5" /> Contests
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={e => logout(e)}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium w-full transition"
                    >
                        <LogOut className="h-5 w-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
                    <span className="font-bold text-xl">PrepPortal</span>
                    <button onClick={e => logout(e)} className="text-red-600"><LogOut className="h-5 w-5" /></button>
                </header>

                <div className="p-8 max-w-7xl mx-auto">
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Hello, <span className={getRatingColor(stats.contest_rating || 0)}>{name}</span> 👋
                            </h1>
                            <p className="text-gray-500 mt-1">Here's what's happening with your prep today.</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-blue-100 rounded-xl">
                                    <CheckCircle className="h-6 w-6 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Problems Solved</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.problems_solved}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-purple-100 rounded-xl">
                                    <Code className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Total Submissions</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total_submissions || 0}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-yellow-100 rounded-xl">
                                    <Zap className="h-6 w-6 text-yellow-600" />
                                </div>
                                <span className={`text-sm font-bold ${stats.current_streak > 0 ? 'text-green-500' : 'text-gray-400'}`}>
                                    {stats.current_streak > 0 ? 'Active' : 'Inactive'}
                                </span>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Current Streak</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.current_streak} {stats.current_streak === 1 ? 'Day' : 'Days'}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-green-100 rounded-xl">
                                    <Clock className="h-6 w-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Hours Spent</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.hours_spent}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-indigo-100 rounded-xl">
                                    <Trophy className="h-6 w-6 text-indigo-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Contests Attended</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.contests_attended || 0}</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-orange-100 rounded-xl">
                                    <Trophy className="h-6 w-6 text-orange-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">Contest Rating</h3>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stats.contest_rating || 0}</p>
                        </div>
                    </div>

                    {/* Rating Graph */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Rating Progression</h3>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={ratingHistory}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    {/* Colored background zones */}
                                    <ReferenceArea y1={0} y2={300} fill="#f3f4f6" fillOpacity={0.7} />
                                    <ReferenceArea y1={300} y2={500} fill="#dcfce7" fillOpacity={0.7} />
                                    <ReferenceArea y1={500} y2={800} fill="#dbeafe" fillOpacity={0.7} />
                                    <ReferenceArea y1={800} y2={1000} fill="#f3e8ff" fillOpacity={0.7} />
                                    <ReferenceArea y1={1000} y2={10000} fill="#fee2e2" fillOpacity={0.7} />

                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 1200]}
                                        ticks={[0, 300, 500, 800, 1000]}
                                        tickFormatter={(value) => {
                                            if (value === 1000) return 'Master';
                                            if (value === 800) return 'Expert';
                                            if (value === 500) return 'Achiever';
                                            if (value === 300) return 'Beginner';
                                            if (value === 0) return 'Unrated';
                                            return '';
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="rating"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Recommended Problems */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Recommended for you</h3>
                                <Link to="/problems" className="text-blue-600 text-sm font-medium hover:underline">View all</Link>
                            </div>
                            <div className="space-y-4">
                                {recommended.length > 0 ? recommended.map((prob, idx) => (
                                    <Link to={`/problems/${prob.problem_id}`} key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm">{prob.title}</h4>
                                            <p className="text-xs text-gray-500 mt-1">{prob.topic}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${prob.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                                            prob.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {prob.difficulty}
                                        </span>
                                    </Link>
                                )) : (
                                    <p className="text-center text-gray-500 py-8">Solve some problems to get personalized recommendations!</p>
                                )}
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6">Your Progress</h3>
                            <div className="space-y-6">
                                {progress.length > 0 ? progress.map((item, idx) => {
                                    const colors = ['blue', 'purple', 'yellow'];
                                    const color = colors[idx % colors.length];
                                    return (
                                        <div key={idx}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="font-medium text-gray-700">{item.topic}</span>
                                                <span className="text-gray-900 font-bold">{item.percentage}%</span>
                                            </div>
                                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full bg-${color}-600 rounded-full`}
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <p className="text-center text-gray-500 py-8 ">Start solving problems to track your progress!</p>
                                )}
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <Link to="/contests" className="flex items-center justify-center w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition">
                                    <Trophy className="h-4 w-4 mr-2" /> Join Weekly Contest
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
