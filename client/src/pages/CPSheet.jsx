import React, { useState, useEffect } from 'react';
import {
    Calculator, Cpu, Hash, FunctionSquare, Target, Search, Layers, Zap,
    Share2, TreeDeciduous, GitMerge, ScanLine, AlignLeft, Award, Sparkles,
    ChevronDown, CheckCircle, ExternalLink, FolderOpen, Folder, Lock
} from 'lucide-react';
import { toast } from 'react-toastify';
import problemData from '../data/little_sheep_yawn_problems.json';

const CPSheet = ({ isAuthenticated }) => {
    // State for expanded sections (Modules)
    const [expandedModules, setExpandedModules] = useState({ "Number Theory": true });

    // State for expanded sub-topics within modules
    // Format: { "Module Name": { "SubTopic Name": boolean } }
    const [expandedSubTopics, setExpandedSubTopics] = useState({});

    // State for rating filters
    // Format: { "Module Name": { "SubTopic Name": "rating_string" } }
    const [ratingFilters, setRatingFilters] = useState({});

    // State for solved problems (persisted in local storage)
    const [solvedProblems, setSolvedProblems] = useState(() => {
        const saved = localStorage.getItem('cp_sheet_solved');
        return saved ? JSON.parse(saved) : {};
    });

    // Persist solved state
    useEffect(() => {
        localStorage.setItem('cp_sheet_solved', JSON.stringify(solvedProblems));
    }, [solvedProblems]);

    // Toggle module expansion
    const toggleModule = (moduleName) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleName]: !prev[moduleName]
        }));
    };

    // Toggle sub-topic expansion
    const toggleSubTopic = (moduleName, subTopicName, e) => {
        // Don't toggle if clicking on input
        if (e.target.tagName === 'INPUT') return;

        e.stopPropagation();
        setExpandedSubTopics(prev => ({
            ...prev,
            [moduleName]: {
                ...(prev[moduleName] || {}),
                [subTopicName]: !prev[moduleName]?.[subTopicName]
            }
        }));
    };

    // Handle rating filter change
    const handleFilterChange = (moduleName, subTopicName, value) => {
        setRatingFilters(prev => ({
            ...prev,
            [moduleName]: {
                ...(prev[moduleName] || {}),
                [subTopicName]: value
            }
        }));
    };

    // Toggle problem solved status
    const toggleProblem = (problemId, e) => {
        e.stopPropagation();

        if (!isAuthenticated) {
            toast.error("Please login to track your progress!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        setSolvedProblems(prev => ({
            ...prev,
            [problemId]: !prev[problemId]
        }));
    };

    // Icon mapping
    const getIcon = (title) => {
        const map = {
            "Number Theory": <Calculator className="h-6 w-6 text-blue-500" />,
            "Bit Manipulation": <Cpu className="h-6 w-6 text-purple-500" />,
            "Combinatorics": <Hash className="h-6 w-6 text-green-500" />,
            "Advance Mathematics": <FunctionSquare className="h-6 w-6 text-indigo-500" />,
            "Greedy Algorithms": <Target className="h-6 w-6 text-red-500" />,
            "Searching Techniques": <Search className="h-6 w-6 text-teal-500" />,
            "Must know Data Structures": <Layers className="h-6 w-6 text-orange-500" />,
            "Pre-Computation": <Zap className="h-6 w-6 text-yellow-500" />,
            "Graph Algorithms": <Share2 className="h-6 w-6 text-pink-500" />,
            "Tree Algorithms": <TreeDeciduous className="h-6 w-6 text-emerald-500" />,
            "Dynamic Programming": <GitMerge className="h-6 w-6 text-cyan-500" />,
            "Range Queries": <ScanLine className="h-6 w-6 text-lime-500" />,
            "String Algorithms": <AlignLeft className="h-6 w-6 text-rose-500" />,
            "Game Theory": <Award className="h-6 w-6 text-amber-500" />,
            "Advanced Topics": <Sparkles className="h-6 w-6 text-violet-500" />,
            "Uncategorized": <Layers className="h-6 w-6 text-gray-400" />
        };
        return map[title] || <Layers className="h-6 w-6 text-gray-500" />;
    };

    const getRatingColor = (rating) => {
        if (rating < 1200) return "bg-gray-100 text-gray-600";
        if (rating < 1400) return "bg-green-100 text-green-700";
        if (rating < 1600) return "bg-cyan-100 text-cyan-700";
        if (rating < 1900) return "bg-blue-100 text-blue-700";
        if (rating < 2100) return "bg-purple-100 text-purple-700";
        if (rating < 2400) return "bg-orange-100 text-orange-700";
        return "bg-red-100 text-red-700";
    };

    const orderedModules = [
        "Number Theory", "Bit Manipulation", "Combinatorics", "Advance Mathematics",
        "Greedy Algorithms", "Searching Techniques", "Must know Data Structures", "Pre-Computation",
        "Graph Algorithms", "Tree Algorithms", "Dynamic Programming", "Range Queries",
        "String Algorithms", "Game Theory", "Advanced Topics", "Uncategorized"
    ];

    // Helper to calculate progress
    const calculateProgress = (problems) => {
        if (!problems || problems.length === 0) return 0;
        const solvedCount = problems.filter(p => solvedProblems[p.id]).length;
        return Math.round((solvedCount / problems.length) * 100);
    };

    // Flatten all problems for total count
    const allProblems = Object.values(problemData).flatMap(subTopics =>
        Object.values(subTopics).flat()
    );
    const totalProblems = allProblems.length;
    const totalSolved = allProblems.filter(p => solvedProblems[p.id]).length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 mt-2">
                        Little Sheep's Training Sheet
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-4">
                        A curated collection of <span className="font-bold text-gray-900">{totalProblems}</span> solved problems from Codeforces,
                        organized by CP modules.
                    </p>
                    {/* Overall Progress */}
                    <div className="max-w-xl mx-auto bg-gray-50 rounded-full h-4 overflow-hidden border border-gray-200">
                        <div
                            className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700 ease-out"
                            style={{ width: `${(totalSolved / totalProblems) * 100}%` }}
                        ></div>
                    </div>
                    <p className="text-gray-400 text-sm mt-2">
                        Total Progress: {totalSolved} / {totalProblems} Solved
                    </p>
                </div>

                <div className="space-y-6">
                    {orderedModules.map((moduleName, index) => {
                        const subTopics = problemData[moduleName] || {};
                        const moduleProblems = Object.values(subTopics).flat();

                        if (moduleProblems.length === 0) return null;

                        const progress = calculateProgress(moduleProblems);
                        const solvedCount = moduleProblems.filter(p => solvedProblems[p.id]).length;

                        return (
                            <div key={moduleName} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                                {/* Module Header */}
                                <button
                                    onClick={() => toggleModule(moduleName)}
                                    className="w-full flex flex-col p-0 bg-white hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center justify-between p-6 w-full">
                                        <div className="flex items-center gap-5">
                                            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                                                {getIcon(moduleName)}
                                            </div>
                                            <div className="text-left">
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {index + 1}. {moduleName}
                                                </h3>
                                                {/* Prominent Solved Count */}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-base font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                                        {solvedCount} / {moduleProblems.length} Solved
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`transform transition-transform duration-300 ${expandedModules[moduleName] ? 'rotate-180' : ''}`}>
                                            <ChevronDown className="h-6 w-6 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="w-full h-1.5 bg-gray-100">
                                        <div
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </button>

                                {/* Sub-topics List */}
                                {expandedModules[moduleName] && (
                                    <div className="bg-gray-50/50">
                                        {Object.entries(subTopics).map(([subTopicName, problems]) => {
                                            const isExpanded = expandedSubTopics[moduleName]?.[subTopicName];
                                            const subSolved = problems.filter(p => solvedProblems[p.id]).length;

                                            // Filtering Logic
                                            const filterRating = ratingFilters[moduleName]?.[subTopicName] || '';
                                            const displayProblems = filterRating
                                                ? problems.filter(p => p.rating === parseInt(filterRating))
                                                : problems;

                                            return (
                                                <div key={subTopicName} className="border-t border-gray-100">
                                                    {/* Sub-topic Header */}
                                                    <div
                                                        onClick={(e) => toggleSubTopic(moduleName, subTopicName, e)}
                                                        className="w-full flex items-center justify-between py-3 px-8 bg-white hover:bg-gray-50 transition-colors border-b border-gray-50 cursor-pointer"
                                                    >
                                                        <div className="flex items-center gap-3 flex-1">
                                                            {isExpanded ? <FolderOpen className="h-4 w-4 text-blue-400" /> : <Folder className="h-4 w-4 text-gray-400" />}
                                                            <span className="font-semibold text-gray-700 text-sm whitespace-nowrap">{subTopicName}</span>
                                                            <span className="text-xs text-gray-500 bg-white border border-gray-200 px-2 py-0.5 rounded-full font-medium shadow-sm">
                                                                {subSolved}/{problems.length}
                                                            </span>

                                                            {/* Rating Filter Input */}
                                                            <div className="ml-4" onClick={(e) => e.stopPropagation()}>
                                                                <input
                                                                    type="number"
                                                                    placeholder="Rating..."
                                                                    className="w-24 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200 transition-colors bg-gray-50 focus:bg-white"
                                                                    value={filterRating}
                                                                    onChange={(e) => handleFilterChange(moduleName, subTopicName, e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <ChevronDown className={`h-4 w-4 text-gray-300 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                                    </div>

                                                    {/* Problems Table */}
                                                    {isExpanded && (
                                                        <div className="overflow-x-auto bg-white pl-4">
                                                            {displayProblems.length > 0 ? (
                                                                <table className="w-full text-left border-collapse">
                                                                    <tbody>
                                                                        {displayProblems.map((problem) => (
                                                                            <tr key={problem.id} className={`border-b border-gray-50 transition-colors group ${solvedProblems[problem.id] ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}>
                                                                                <td className="py-2 px-4 w-12 text-center pointer-events-auto">
                                                                                    <button
                                                                                        onClick={(e) => toggleProblem(problem.id, e)}
                                                                                        className={`p-1 rounded-full transition-transform active:scale-95 ${solvedProblems[problem.id]
                                                                                                ? 'text-green-500'
                                                                                                : 'text-gray-200 hover:text-gray-400'
                                                                                            }`}
                                                                                        title={isAuthenticated ? (solvedProblems[problem.id] ? "Mark as unsolved" : "Mark as solved") : "Login to track"}
                                                                                    >
                                                                                        {isAuthenticated || solvedProblems[problem.id] ? (
                                                                                            <CheckCircle className="h-6 w-6" />
                                                                                        ) : (
                                                                                            <Lock className="h-4 w-4 text-gray-300" />
                                                                                        )}
                                                                                    </button>
                                                                                </td>
                                                                                <td className="py-2 px-4">
                                                                                    <a
                                                                                        href={problem.link}
                                                                                        target="_blank"
                                                                                        rel="noopener noreferrer"
                                                                                        className={`text-sm font-medium flex items-center gap-2 ${solvedProblems[problem.id] ? 'text-gray-400 line-through' : 'text-gray-700 hover:text-blue-600'}`}
                                                                                    >
                                                                                        {problem.name}
                                                                                    </a>
                                                                                </td>
                                                                                <td className="py-2 px-4 text-right">
                                                                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getRatingColor(problem.rating)}`}>
                                                                                        {problem.rating}
                                                                                    </span>
                                                                                </td>
                                                                                <td className="py-2 px-4 text-right text-xs text-gray-400 font-mono w-20">
                                                                                    {problem.contestId}{problem.index}
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <div className="p-4 text-center text-sm text-gray-400 italic">
                                                                    No problems found with rating {filterRating}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CPSheet;
