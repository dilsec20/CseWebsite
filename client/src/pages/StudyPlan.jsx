import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Circle, Lock, ArrowRight, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudyPlan = () => {
    const [planData, setPlanData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/study-plans/blind75`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            const data = await res.json();
            if (res.ok) {
                setPlanData(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getDifficultyColor = (diff) => {
        switch (diff?.toLowerCase()) {
            case 'easy': return 'bg-green-100 text-green-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading Plan...</div>;

    const progressPercentage = planData ? Math.round((planData.total_solved / planData.total_problems) * 100) : 0;

    return (
        <div className="min-h-screen bg-gray-50 font-sans pb-12">
            {/* Header / Hero */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 md:py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <Brain size={28} />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Blind 75</h1>
                                <p className="text-gray-500 text-sm">The essential list for top product companies.</p>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="min-w-[200px]">
                            <div className="flex justify-between text-sm font-medium mb-1.5">
                                <span className="text-gray-700">{planData?.total_solved} / {planData?.total_problems} Solved</span>
                                <span className="text-blue-600">{progressPercentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div
                                    className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                <div className="grid gap-6">
                    {planData?.modules.map((module, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            {/* Category Header */}
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-800">{module.category}</h2>
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    {module.problems.filter(p => p.completed).length} / {module.problems.length} Done
                                </span>
                            </div>

                            {/* Problems List */}
                            <div className="divide-y divide-gray-100">
                                {module.problems.map((problem, pIdx) => (
                                    <div key={pIdx} className={`px-6 py-4 flex items-center justify-between transition-colors ${problem.completed ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                                        <div className="flex items-center gap-4">
                                            {/* Status Icon */}
                                            {problem.completed ? (
                                                <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                                            ) : (
                                                <Circle className="text-gray-300 flex-shrink-0" size={20} />
                                            )}

                                            <div>
                                                <h3 className={`font-medium ${problem.completed ? 'text-gray-800' : 'text-gray-900'} ${!problem.available && 'opacity-60'}`}>
                                                    {problem.title}
                                                </h3>
                                                {/* Tags */}
                                                <div className="flex gap-2 mt-1">
                                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getDifficultyColor(problem.difficulty)}`}>
                                                        {problem.difficulty}
                                                    </span>
                                                    {!problem.available && (
                                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 border border-gray-200">
                                                            Coming Soon
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        {problem.available ? (
                                            <Link
                                                to={`/problems/${problem.problem_id}`}
                                                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${problem.completed
                                                        ? 'text-blue-600 hover:bg-blue-50'
                                                        : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                                                    }`}
                                            >
                                                {problem.completed ? 'Practice Again' : 'Solve'}
                                                <ArrowRight size={16} />
                                            </Link>
                                        ) : (
                                            <div className="text-gray-400 p-2">
                                                <Lock size={16} />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudyPlan;
