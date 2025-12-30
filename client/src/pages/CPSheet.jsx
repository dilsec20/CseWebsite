import React, { useState, useMemo } from 'react';
import {
    Calculator, Cpu, Hash, FunctionSquare, Target, Search, Layers, Zap,
    Share2, TreeDeciduous, GitMerge, ScanLine, AlignLeft, Award, Sparkles,
    ChevronDown, ChevronUp, CheckCircle, ExternalLink, Filter
} from 'lucide-react';
import problemData from '../data/little_sheep_yawn_problems.json';

const CPSheet = () => {
    // State for expanded sections (by default expand the first one)
    const [expandedModules, setExpandedModules] = useState({ "Number Theory": true });

    // Toggle module expansion
    const toggleModule = (moduleName) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleName]: !prev[moduleName]
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

    // Calculate rating color
    const getRatingColor = (rating) => {
        if (rating < 1200) return "bg-gray-100 text-gray-600";
        if (rating < 1400) return "bg-green-100 text-green-700";
        if (rating < 1600) return "bg-cyan-100 text-cyan-700";
        if (rating < 1900) return "bg-blue-100 text-blue-700";
        if (rating < 2100) return "bg-purple-100 text-purple-700";
        if (rating < 2400) return "bg-orange-100 text-orange-700";
        return "bg-red-100 text-red-700";
    };

    // Ordered list of modules to ensure consistent display order
    const orderedModules = [
        "Number Theory", "Bit Manipulation", "Combinatorics", "Advance Mathematics",
        "Greedy Algorithms", "Searching Techniques", "Must know Data Structures", "Pre-Computation",
        "Graph Algorithms", "Tree Algorithms", "Dynamic Programming", "Range Queries",
        "String Algorithms", "Game Theory", "Advanced Topics", "Uncategorized"
    ];

    // Filter available data based on order
    const displayData = orderedModules
        .map(key => ({ title: key, problems: problemData[key] || [] }))
        .filter(item => item.problems.length > 0);

    const totalProblems = Object.values(problemData).flat().length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3 mt-2">
                        Little Sheep's Training Sheet
                    </h1>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        A curated collection of <span className="font-bold text-gray-900">{totalProblems}</span> solved problems from Codeforces,
                        organized by CP modules and sorted by difficulty.
                    </p>
                </div>

                {/* Modules List */}
                <div className="space-y-6">
                    {displayData.map((module, index) => (
                        <div key={module.title} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md">
                            {/* Module Header */}
                            <button
                                onClick={() => toggleModule(module.title)}
                                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
                                        {getIcon(module.title)}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-gray-900">
                                            {index + 1}. {module.title}
                                        </h3>
                                        <span className="text-sm text-gray-500 font-medium">
                                            {module.problems.length} Problems
                                        </span>
                                    </div>
                                </div>
                                <div className={`transform transition-transform duration-300 ${expandedModules[module.title] ? 'rotate-180' : ''}`}>
                                    <ChevronDown className="h-6 w-6 text-gray-400" />
                                </div>
                            </button>

                            {/* Problems List */}
                            {expandedModules[module.title] && (
                                <div className="border-t border-gray-100 bg-gray-50/30">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-gray-50 border-b border-gray-200">
                                                    <th className="py-4 px-6 font-semibold text-gray-600 w-16 text-center">Status</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-600">Problem Name</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-600 w-32 text-center">Rating</th>
                                                    <th className="py-4 px-6 font-semibold text-gray-600 w-32 text-center">Contest</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {module.problems.map((problem) => (
                                                    <tr key={problem.id} className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors group">
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex justify-center">
                                                                <CheckCircle className="h-6 w-6 text-green-500 fill-green-50" />
                                                            </div>
                                                        </td>
                                                        <td className="py-3 px-6">
                                                            <a
                                                                href={problem.link}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-gray-900 font-medium hover:text-blue-600 flex items-center gap-2 group-hover:underline decoration-blue-400 underline-offset-2"
                                                            >
                                                                {problem.name}
                                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400" />
                                                            </a>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getRatingColor(problem.rating)}`}>
                                                                {problem.rating || "Unrated"}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-6 text-center text-gray-500 font-mono text-sm">
                                                            {problem.contestId}{problem.index}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Footer for Module */}
                                    <div className="p-4 text-center border-t border-gray-200 bg-gray-50 text-sm text-gray-500">
                                        Showing {module.problems.length} accepted solutions sorted by difficulty (Rating)
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CPSheet;
