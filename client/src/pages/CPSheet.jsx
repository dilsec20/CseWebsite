import React, { useState, useEffect } from 'react';
import {
    Calculator, Cpu, Hash, FunctionSquare, Target, Search, Layers, Zap,
    Share2, TreeDeciduous, GitMerge, ScanLine, AlignLeft, Award, Sparkles,
    ChevronDown, CheckCircle, ExternalLink, FolderOpen, Folder, Lock, RefreshCw, User, Trophy
} from 'lucide-react';
import { toast } from 'react-toastify';
import problemData from '../data/little_sheep_yawn_problems.json';

const CPSheet = ({ isAuthenticated }) => {
    // State for expanded sections (Modules)
    const [expandedModules, setExpandedModules] = useState({ "Number Theory": true });

    // State for expanded sub-topics within modules
    const [expandedSubTopics, setExpandedSubTopics] = useState({});

    // State for rating filters
    const [ratingFilters, setRatingFilters] = useState({});

    // State for solved problems (persisted in local storage)
    const [solvedProblems, setSolvedProblems] = useState(() => {
        const saved = localStorage.getItem('cp_sheet_solved');
        return saved ? JSON.parse(saved) : {};
    });

    // Codeforces Integration State
    const [cfHandle, setCfHandle] = useState(() => localStorage.getItem('cf_handle') || '');
    const [isSyncing, setIsSyncing] = useState(false);
    const [cfUser, setCfUser] = useState(() => {
        const saved = localStorage.getItem('cf_user_data');
        return saved ? JSON.parse(saved) : null;
    });
    const [lastSynced, setLastSynced] = useState(() => localStorage.getItem('cf_last_synced') || null);

    // Persist solved state
    useEffect(() => {
        localStorage.setItem('cp_sheet_solved', JSON.stringify(solvedProblems));
    }, [solvedProblems]);

    // Codeforces Sync Logic
    const syncWithCodeforces = async () => {
        if (!cfHandle.trim()) {
            toast.warning("Please enter a valid Codeforces handle!");
            return;
        }

        setIsSyncing(true);
        try {
            // 1. Fetch User Info
            const userRes = await fetch(`https://codeforces.com/api/user.info?handles=${cfHandle}`);
            const userData = await userRes.json();

            if (userData.status !== 'OK') {
                throw new Error("Handle not found");
            }

            const user = userData.result[0];
            setCfUser(user);
            localStorage.setItem('cf_handle', cfHandle);
            localStorage.setItem('cf_user_data', JSON.stringify(user));

            // 2. Fetch User Submissions
            const subRes = await fetch(`https://codeforces.com/api/user.status?handle=${cfHandle}`);
            const subData = await subRes.json();

            if (subData.status === 'OK') {
                // Reset solved state to ensure we only show the current user's progress
                const newSolved = {};
                let count = 0;

                subData.result.forEach(sub => {
                    if (sub.verdict === 'OK') {
                        // Create ID match: ContestID-Index (e.g., 4-A, 1343-C) matching our JSON data
                        const problemId = `${sub.problem.contestId}-${sub.problem.index}`;

                        // Mark as solved
                        newSolved[problemId] = true;
                    }
                });

                setSolvedProblems(newSolved);
                const now = new Date().toLocaleString();
                setLastSynced(now);
                localStorage.setItem('cf_last_synced', now);

                toast.success(`Synced! Updated solved problems for ${user.handle}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Failed to sync with Codeforces");
        } finally {
            setIsSyncing(false);
        }
    };

    // Toggle module expansion
    const toggleModule = (moduleName) => {
        setExpandedModules(prev => ({
            ...prev,
            [moduleName]: !prev[moduleName]
        }));
    };

    // Toggle sub-topic expansion
    const toggleSubTopic = (moduleName, subTopicName, e) => {
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

    // Toggle problem solved status manually
    const toggleProblem = (problemId, e) => {
        e.stopPropagation();

        // If synced with Codeforces, prevent manual toggle
        if (cfUser) {
            toast.info("Progress is managed by Codeforces Sync");
            return;
        }

        // Allow manual toggle even without auth for tracker usage
        setSolvedProblems(prev => ({
            ...prev,
            [problemId]: !prev[problemId]
        }));
    };

    // Helper to get rating color
    const getRatingColor = (rating) => {
        if (rating < 1200) return "bg-gray-100 text-gray-500 border-gray-200";
        if (rating < 1400) return "bg-green-50 text-green-600 border-green-200";
        if (rating < 1600) return "bg-cyan-50 text-cyan-600 border-cyan-200";
        if (rating < 1900) return "bg-blue-50 text-blue-600 border-blue-200";
        if (rating < 2100) return "bg-purple-50 text-purple-600 border-purple-200";
        if (rating < 2400) return "bg-orange-50 text-orange-600 border-orange-200";
        return "bg-red-50 text-red-600 border-red-200";
    };

    const getIcon = (title) => {
        const map = {
            "Number Theory": <Calculator className="h-5 w-5" />,
            "Bit Manipulation": <Cpu className="h-5 w-5" />,
            "Combinatorics": <Hash className="h-5 w-5" />,
            "Advance Mathematics": <FunctionSquare className="h-5 w-5" />,
            "Greedy Algorithms": <Target className="h-5 w-5" />,
            "Searching Techniques": <Search className="h-5 w-5" />,
            "Must know Data Structures": <Layers className="h-5 w-5" />,
            "Pre-Computation": <Zap className="h-5 w-5" />,
            "Graph Algorithms": <Share2 className="h-5 w-5" />,
            "Tree Algorithms": <TreeDeciduous className="h-5 w-5" />,
            "Dynamic Programming": <GitMerge className="h-5 w-5" />,
            "Range Queries": <ScanLine className="h-5 w-5" />,
            "String Algorithms": <AlignLeft className="h-5 w-5" />,
            "Game Theory": <Award className="h-5 w-5" />,
            "Advanced Topics": <Sparkles className="h-5 w-5" />,
            "Uncategorized": <Layers className="h-5 w-5" />
        };
        return map[title] || <Layers className="h-5 w-5" />;
    };

    const orderedModules = [
        "Number Theory", "Bit Manipulation", "Combinatorics", "Advance Mathematics",
        "Greedy Algorithms", "Searching Techniques", "Must know Data Structures", "Pre-Computation",
        "Graph Algorithms", "Tree Algorithms", "Dynamic Programming", "Range Queries",
        "String Algorithms", "Game Theory", "Advanced Topics", "Uncategorized"
    ];

    // Helper calculate stats
    const allProblems = Object.values(problemData).flatMap(subTopics => Object.values(subTopics).flat());
    const totalProblems = allProblems.length;
    const totalSolved = allProblems.filter(p => solvedProblems[p.id]).length;
    const progressPercentage = Math.round((totalSolved / totalProblems) * 100) || 0;

    return (
        <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans pb-12">

            {/* --- HERO HEADER --- */}
            <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                        {/* Branding */}
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-900 tracking-tight">CP Sheet</h1>
                                <p className="text-xs text-slate-500 font-medium">Master Competitive Programming</p>
                            </div>
                        </div>

                        {/* CF Sync Widget */}
                        <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
                            {cfUser ? (
                                <div className="flex items-center gap-3 px-2">
                                    <img
                                        src={cfUser.titlePhoto}
                                        alt="Avatar"
                                        className="h-8 w-8 rounded-full border border-slate-300"
                                    />
                                    <div className="flex flex-col leading-none">
                                        <span className={`text-sm font-bold ${cfUser.rank === "legendary grandmaster" ? "text-red-600 first-letter:text-black" :
                                            getRatingColor(cfUser.rating).replace('bg-', 'text-').split(' ')[1]
                                            }`}>
                                            {cfUser.handle}
                                        </span>
                                        <span className="text-[10px] text-slate-400">
                                            {cfUser.rating} ({cfUser.rank})
                                        </span>
                                    </div>
                                    <div className="h-4 w-[1px] bg-slate-200 mx-1"></div>
                                </div>
                            ) : (
                                <div className="px-2">
                                    <User className="h-5 w-5 text-slate-400" />
                                </div>
                            )}

                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="CF Handle" // e.g., tourist
                                    className="bg-white border border-slate-200 text-sm rounded-md px-3 py-1.5 w-32 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                                    value={cfHandle}
                                    onChange={(e) => setCfHandle(e.target.value)}
                                    title="Enter Codeforces Handle"
                                />
                            </div>

                            <button
                                onClick={syncWithCodeforces}
                                disabled={isSyncing}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${isSyncing
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : "bg-black text-white hover:bg-slate-800 shadow-md shadow-slate-200"
                                    }`}
                            >
                                <RefreshCw className={`h-3.5 w-3.5 ${isSyncing ? "animate-spin" : ""}`} />
                                {isSyncing ? "Syncing..." : "Sync"}
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar (Bottom of Header) */}
                    <div className="mt-4 flex items-center justify-between text-xs font-medium text-slate-500">
                        <span>Total Progress</span>
                        <span>{totalSolved} / {totalProblems} Solved ({progressPercentage}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    {lastSynced && (
                        <p className="text-[10px] text-right text-slate-300 mt-1">Last synced: {lastSynced}</p>
                    )}
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

                {orderedModules.map((moduleName, idx) => {
                    const subTopics = problemData[moduleName] || {};
                    const moduleProblems = Object.values(subTopics).flat();
                    if (moduleProblems.length === 0) return null;

                    const modProgress = Math.round((moduleProblems.filter(p => solvedProblems[p.id]).length / moduleProblems.length) * 100);
                    const isExpanded = expandedModules[moduleName];

                    return (
                        <div key={moduleName} className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">

                            {/* Module Header */}
                            <div
                                onClick={() => toggleModule(moduleName)}
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${isExpanded ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                                        {getIcon(moduleName)}
                                    </div>
                                    <div>
                                        <h2 className="text-base font-semibold text-slate-900">{idx + 1}. {moduleName}</h2>
                                        <p className="text-xs text-slate-500 mt-0.5">{moduleProblems.length} Problems</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="hidden sm:flex flex-col items-end w-32">
                                        <span className="text-xs font-bold text-slate-700">{modProgress}% Done</span>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full mt-1">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${modProgress}%` }}></div>
                                        </div>
                                    </div>
                                    <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                                </div>
                            </div>

                            {/* Subtopics */}
                            {isExpanded && (
                                <div className="border-t border-slate-100">
                                    {Object.entries(subTopics).map(([subTopicName, problems]) => {
                                        const isSubExpanded = expandedSubTopics[moduleName]?.[subTopicName];
                                        const solvedCount = problems.filter(p => solvedProblems[p.id]).length;

                                        // Filtering Logic
                                        const filterRating = ratingFilters[moduleName]?.[subTopicName] || '';
                                        const displayProblems = filterRating
                                            ? problems.filter(p => p.rating === parseInt(filterRating))
                                            : problems;

                                        return (
                                            <div key={subTopicName} className="border-b border-slate-50 last:border-0">
                                                {/* Subtopic Header */}
                                                <div
                                                    onClick={(e) => toggleSubTopic(moduleName, subTopicName, e)}
                                                    className="flex items-center justify-between py-3 px-4 pl-14 hover:bg-slate-50 cursor-pointer transition-colors"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        {isSubExpanded ? <FolderOpen className="h-4 w-4 text-blue-500" /> : <Folder className="h-4 w-4 text-slate-400" />}
                                                        <span className="text-sm font-medium text-slate-700">{subTopicName}</span>
                                                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md font-mono">
                                                            {solvedCount}/{problems.length}
                                                        </span>

                                                        {/* Rating Filter Input */}
                                                        <div className="ml-4" onClick={(e) => e.stopPropagation()}>
                                                            <input
                                                                type="text"
                                                                inputMode="numeric"
                                                                placeholder="Rating"
                                                                className="w-20 px-2 py-1 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-blue-400 bg-white"
                                                                value={filterRating}
                                                                onChange={(e) => handleFilterChange(moduleName, subTopicName, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Problems Table */}
                                                {isSubExpanded && (
                                                    <div className="bg-slate-50/50 pl-14 pr-4 py-2">
                                                        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                                                            {displayProblems.length > 0 ? (
                                                                <table className="w-full text-left text-sm">
                                                                    <thead className="bg-slate-50 text-xs text-slate-500 uppercase font-medium border-b border-slate-200">
                                                                        <tr>
                                                                            <th className="py-2 px-4 w-12 text-center">#</th>
                                                                            <th className="py-2 px-4">Problem</th>
                                                                            <th className="py-2 px-4 text-right">Rating</th>
                                                                            <th className="py-2 px-4 text-right">Status</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="divide-y divide-slate-100">
                                                                        {displayProblems.map((prob, i) => {
                                                                            const isSolved = solvedProblems[prob.id];
                                                                            return (
                                                                                <tr key={prob.id} className={`group hover:bg-blue-50/30 transition-colors ${isSolved ? "bg-green-50/30" : ""}`}>
                                                                                    <td className="py-2 px-4 text-center text-slate-400 text-xs font-mono">{i + 1}</td>
                                                                                    <td className="py-2 px-4">
                                                                                        <a
                                                                                            href={prob.link}
                                                                                            target="_blank"
                                                                                            rel="noreferrer"
                                                                                            className={`font-medium transition-colors flex items-center gap-2 group-hover:text-blue-600 ${isSolved ? "text-slate-400 line-through decoration-slate-300" : "text-slate-700"
                                                                                                }`}
                                                                                        >
                                                                                            {prob.name}
                                                                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                                                                                        </a>
                                                                                    </td>
                                                                                    <td className="py-2 px-4 text-right">
                                                                                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${getRatingColor(prob.rating)}`}>
                                                                                            {prob.rating}
                                                                                        </span>
                                                                                    </td>
                                                                                    <td className="py-2 px-4 text-right">
                                                                                        <button
                                                                                            onClick={(e) => toggleProblem(prob.id, e)}
                                                                                            className={`p-1 rounded-full transition-all active:scale-95 ${isSolved ? "text-green-600 bg-green-100" : "text-slate-300 hover:text-slate-500"
                                                                                                }`}
                                                                                        >
                                                                                            {isSolved ? <CheckCircle className="h-5 w-5" /> : <div className="h-5 w-5 rounded-full border-2 border-current"></div>}
                                                                                        </button>
                                                                                    </td>
                                                                                </tr>
                                                                            );
                                                                        })}
                                                                    </tbody>
                                                                </table>
                                                            ) : (
                                                                <div className="p-4 text-center text-sm text-slate-400 italic">
                                                                    No problems found with rating {filterRating}
                                                                </div>
                                                            )}
                                                        </div>
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
    );
};

export default CPSheet;
