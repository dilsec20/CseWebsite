import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        fetchLeaderboard();
    }, [page]);

    const fetchLeaderboard = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gamification/leaderboard?page=${page}`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (res.ok) {
                setUsers(data.leaderboard || []);
                setPagination(data.pagination || null);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getRankIcon = (rank) => {
        const actualRank = (page - 1) * 50 + rank;
        if (actualRank === 0) return <Crown className="text-yellow-400 fill-yellow-400" size={24} />;
        if (actualRank === 1) return <Medal className="text-gray-300 fill-gray-300" size={24} />;
        if (actualRank === 2) return <Medal className="text-amber-600 fill-amber-600" size={24} />;
        return <span className="font-bold text-gray-500 w-6 text-center">{actualRank + 1}</span>;
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <Trophy className="text-yellow-500" size={40} />
                    <h1 className="text-3xl font-bold text-gray-800">Global Leaderboard</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                                    <th className="px-6 py-4 text-left font-semibold">Rank</th>
                                    <th className="px-6 py-4 text-left font-semibold">Coder</th>
                                    <th className="px-6 py-4 text-center font-semibold flex items-center justify-center gap-2">
                                        <Trophy size={18} /> Contests
                                    </th>
                                    <th className="px-6 py-4 text-center font-semibold">
                                        <div className="flex items-center justify-center gap-2">
                                            <Star size={18} /> Rating
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="text-center py-8 text-gray-500">Loading rankings...</td>
                                    </tr>
                                ) : users.map((user, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getRankIcon(idx)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm">
                                                    {user.profile_picture ? (
                                                        <img src={user.profile_picture} alt="profile" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold">
                                                            {user.username?.charAt(0).toUpperCase()}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                                        @{user.username}
                                                    </p>
                                                    {(page - 1) * 50 + idx === 0 && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Champion</span>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-mono font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                                                {user.contests_attended || 0}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                                                {user.contest_rating || 0}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {pagination && pagination.total_pages > 1 && (
                        <div className="p-4 border-t border-gray-100 flex justify-between items-center bg-gray-50">
                            <div className="text-sm text-gray-500">
                                Page {pagination.current_page} of {pagination.total_pages} ({pagination.total_users} coders)
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => p - 1)}
                                    disabled={pagination.current_page === 1}
                                    className="px-4 py-2 border rounded-lg flex items-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Previous
                                </button>
                                <button
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={pagination.current_page >= pagination.total_pages}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
