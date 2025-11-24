import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, CheckCircle, Clock, TrendingUp } from 'lucide-react';

const ProblemList = ({ setAuth }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');
    const [solvedFilter, setSolvedFilter] = useState('all'); // all, solved, unsolved
    const [solvedProblems, setSolvedProblems] = useState(new Set());

    // Available topics (matching mockData.js)
    const topics = ['all', 'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph',
        'Dynamic Programming', 'Greedy', 'Backtracking', 'Binary Search', 'Heap', 'Hashing'];

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/problems');
            const data = await response.json();
            setProblems(data);
            // Fetch solved problems
            fetchSolvedProblems();
        } catch (error) {
            console.error('Error fetching problems:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSolvedProblems = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/problems/solved', {
                headers: { token: localStorage.getItem('token') }
            });
            const data = await response.json();
            // Create a Set of solved problem IDs for quick lookup
            const solvedIds = new Set(data.map(p => p.problem_id));
            setSolvedProblems(solvedIds);
        } catch (error) {
            console.error('Error fetching solved problems:', error);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'Medium':
                return 'text-yellow-600 bg-yellow-50 border-yellow-200';
            case 'Hard':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    // Filter by difficulty, topic, and solved status
    const filteredProblems = problems.filter(p => {
        const difficultyMatch = filter === 'all' || p.difficulty?.toLowerCase() === filter.toLowerCase();
        const topicMatch = topicFilter === 'all' || p.topic === topicFilter;
        const solvedMatch = solvedFilter === 'all' ||
            (solvedFilter === 'solved' && solvedProblems.has(p.problem_id)) ||
            (solvedFilter === 'unsolved' && !solvedProblems.has(p.problem_id));
        return difficultyMatch && topicMatch && solvedMatch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading problems...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Problems</h1>
                            <p className="text-gray-600 mt-1">Practice coding problems to ace your interviews</p>
                        </div>
                        <Link
                            to="/"
                            className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="mt-6 space-y-4">
                        {/* Difficulty Filter */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Difficulty</label>
                            <div className="flex gap-2 flex-wrap">
                                {['all', 'easy', 'medium', 'hard'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setFilter(level)}
                                        className={`px-4 py-2 rounded-lg font-medium transition ${filter === level
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Solved Status Filter */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                            <div className="flex gap-2 flex-wrap">
                                {['all', 'solved', 'unsolved'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setSolvedFilter(status)}
                                        className={`px-4 py-2 rounded-lg font-medium transition ${solvedFilter === status
                                            ? 'bg-green-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Topic Filter */}
                        <div>
                            <label className="text-sm font-semibold text-gray-700 mb-2 block">DSA Topic</label>
                            <div className="flex gap-2 flex-wrap">
                                {topics.map((topic) => (
                                    <button
                                        key={topic}
                                        onClick={() => setTopicFilter(topic)}
                                        className={`px-4 py-2 rounded-lg font-medium transition text-sm ${topicFilter === topic
                                            ? 'bg-purple-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {topic}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Active Filters Display */}
                        {(filter !== 'all' || topicFilter !== 'all') && (
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span className="font-medium">Active filters:</span>
                                {filter !== 'all' && (
                                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </span>
                                )}
                                {topicFilter !== 'all' && (
                                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                                        {topicFilter}
                                    </span>
                                )}
                                <button
                                    onClick={() => {
                                        setFilter('all');
                                        setTopicFilter('all');
                                    }}
                                    className="text-blue-600 hover:underline ml-2"
                                >
                                    Clear all
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Problems List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Difficulty
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Topic
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredProblems.map((problem) => (
                                    <tr key={problem.problem_id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {solvedProblems.has(problem.problem_id) ? (
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                <Code className="h-5 w-5 text-gray-400 mr-2" />
                                                <span className="font-medium text-gray-900">{problem.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                                                {problem.difficulty}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {problem.topic}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link
                                                to={`/problems/${problem.problem_id}`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition inline-block"
                                            >
                                                Solve
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredProblems.length === 0 && (
                        <div className="text-center py-12">
                            <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 font-medium">No problems found</p>
                            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters</p>
                        </div>
                    )}

                    <div className="bg-gray-50 px-6 py-4 border-t">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filteredProblems.length}</span> of{' '}
                            <span className="font-semibold text-gray-900">{problems.length}</span> problems
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemList;
