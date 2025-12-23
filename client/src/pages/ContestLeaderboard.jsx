import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../config';

const ContestLeaderboard = () => {
    const { id } = useParams();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch(`${API_URL}/api/contests/global/${id}/leaderboard`, {
                    headers: { token }
                });
                const data = await res.json();
                setLeaderboard(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, [id]);

    if (loading) return <div className="p-8 text-center text-gray-500">Loading Leaderboard...</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <h3 className="bg-gray-50 border-b p-4 font-bold text-gray-700">Leaderboard</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium">
                        <tr>
                            <th className="px-4 py-3">Rank</th>
                            <th className="px-4 py-3">User</th>
                            <th className="px-4 py-3">Score</th>
                            <th className="px-4 py-3">Finished At</th>
                            <th className="px-4 py-3 text-right">Rating Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leaderboard.length === 0 ? (
                            <tr><td colSpan="5" className="px-4 py-8 text-center text-gray-400">No submissions yet</td></tr>
                        ) : leaderboard.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-bold text-gray-700">#{row.rank || index + 1}</td>
                                <td className="px-4 py-3 font-medium text-blue-600">{row.username}</td>
                                <td className="px-4 py-3">{row.score}</td>
                                <td className="px-4 py-3 text-gray-500">{new Date(row.finish_time).toLocaleTimeString()}</td>
                                <td className="px-4 py-3 text-right">
                                    {row.rating_change ? (
                                        <span className={row.rating_change > 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                                            {row.rating_change > 0 ? "+" : ""}{row.rating_change}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContestLeaderboard;
