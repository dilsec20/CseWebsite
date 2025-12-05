import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Code, Trophy, TrendingUp, Shield, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminData();
    }, []);

    const fetchAdminData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const headers = { token: token };

            // Fetch Stats
            const statsRes = await fetch(`${API_URL}/api/admin/stats`, { headers });
            if (statsRes.status === 403) {
                toast.error("Access Denied: Admin only");
                navigate("/dashboard");
                return;
            }
            const statsData = await statsRes.json();
            setStats(statsData);

            // Fetch Users
            const usersRes = await fetch(`${API_URL}/api/admin/users`, { headers });
            const usersData = await usersRes.json();
            setUsers(usersData);

            setLoading(false);
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to load admin data");
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const filteredUsers = users.filter(user =>
        user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <Shield className="h-8 w-8 text-blue-600" />
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-500 mt-1">Platform overview and user management</p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
                    >
                        Exit Admin View
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <Users className="h-6 w-6" />
                            </div>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                +{stats.new_users_7d} this week
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_users}</div>
                        <div className="text-sm text-gray-500 mt-1">Total Registered Users</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                <Code className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_submissions}</div>
                        <div className="text-sm text-gray-500 mt-1">Total Submissions</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <Trophy className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">{stats.total_solved}</div>
                        <div className="text-sm text-gray-500 mt-1">Problems Solved Successfully</div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">
                            {stats.total_users > 0
                                ? Math.round(stats.total_submissions / stats.total_users)
                                : 0}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Avg Submissions / User</div>
                    </div>
                </div>

                {/* User List */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center flex-wrap gap-4">
                        <h2 className="text-lg font-bold text-gray-900">Registered Users</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-64"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm font-medium">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Handle (Username)</th>
                                    <th className="px-6 py-4">Role</th>
                                    <th className="px-6 py-4">Joined</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.user_id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                                                    {user.user_name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.user_name}</div>
                                                    <div className="text-sm text-gray-500">{user.user_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                                                @{user.username || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.role === 'admin' ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                    Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatDate(user.created_at)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href={`/profile/${user.username}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                            >
                                                View Profile
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                            No users found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
