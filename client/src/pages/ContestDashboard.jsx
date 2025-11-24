import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Zap, Play } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const ContestDashboard = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const startContest = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("Please login to start a contest");
                return;
            }

            const response = await fetch(`${API_URL}/api/contests/start`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            });

            if (!response.ok) {
                const errorMsg = await response.json();
                throw new Error(errorMsg);
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

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Contest Arena</h1>
                    <p className="text-xl text-gray-600">Test your skills under pressure. 5 Problems. 2 Hours.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white text-center">
                        <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
                        <h2 className="text-3xl font-bold mb-2">Ready to Compete?</h2>
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
                            onClick={startContest}
                            disabled={loading}
                            className="w-full py-4 bg-gray-900 text-white text-xl font-bold rounded-xl hover:bg-gray-800 transition transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                        >
                            {loading ? "Generating Contest..." : (
                                <>
                                    <Play className="mr-2 h-6 w-6" /> Start New Contest
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDashboard;
