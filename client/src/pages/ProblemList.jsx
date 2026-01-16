import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { API_URL } from '../config';

const ProblemList = ({ setAuth }) => {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [topicFilter, setTopicFilter] = useState('all');
    const [solvedFilter, setSolvedFilter] = useState('all'); // all, solved, unsolved
    const [solvedProblems, setSolvedProblems] = useState(new Set());

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const problemsPerPage = 50;

    // Available topics (matching mockData.js)
    const topics = ['all', 'Array', 'String', 'Linked List', 'Stack', 'Queue', 'Tree', 'Graph',
        'Dynamic Programming', 'Greedy', 'Backtracking', 'Binary Search', 'Heap', 'Hashing'];

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const response = await fetch(`${API_URL}/api/problems`);
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
            const response = await fetch(`${API_URL}/api/problems/solved`, {
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

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, topicFilter, solvedFilter]);

    // Get current problems
    const indexOfLastProblem = currentPage * problemsPerPage;
    const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
    const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
    const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                {currentProblems.map((problem) => (
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

                    <div className="bg-gray-50 px-6 py-4 border-t flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{indexOfFirstProblem + 1}</span> to{' '}
                            <span className="font-semibold text-gray-900">
                                {Math.min(indexOfLastProblem, filteredProblems.length)}
                            </span> of{' '}
                            <span className="font-semibold text-gray-900">{filteredProblems.length}</span> problems
                        </p>

                        {totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => paginate(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`px-3 py-1 rounded border text-sm font-medium transition ${currentPage === 1
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                        }`}
                                >
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {[...Array(totalPages)].map((_, i) => {
                                        // Show first, last, and pages around current
                                        if (
                                            i === 0 ||
                                            i === totalPages - 1 ||
                                            (i >= currentPage - 2 && i <= currentPage)
                                        ) {
                                            return (
                                                <button
                                                    key={i + 1}
                                                    onClick={() => paginate(i + 1)}
                                                    className={`w-8 h-8 rounded border text-sm font-medium transition ${currentPage === i + 1
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                                        }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            );
                                        } else if (
                                            i === currentPage - 3 ||
                                            i === currentPage + 1
                                        ) {
                                            return <span key={i} className="text-gray-400 px-1">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>
                                <button
                                    onClick={() => paginate(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`px-3 py-1 rounded border text-sm font-medium transition ${currentPage === totalPages
                                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemList;
