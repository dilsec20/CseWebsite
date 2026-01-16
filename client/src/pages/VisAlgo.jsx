import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, GitGraph, Share2, Activity, ArrowRight, Layers, Link2, Triangle, Network } from 'lucide-react';

const VisAlgo = () => {
    const algorithms = [
        {
            id: 'sorting',
            title: 'Sorting Algorithms',
            description: 'Visualize how Bubble, Merge, Quick, and other sorting algorithms organize data.',
            icon: <BarChart2 className="w-8 h-8 text-blue-500" />,
            color: 'bg-blue-50 border-blue-100 hover:border-blue-300',
            path: '/visalgo/sorting'
        },
        {
            id: 'pathfinding',
            title: 'Pathfinding',
            description: 'Watch BFS, DFS, Dijkstra, and A* find the shortest path through complex mazes.',
            icon: <Activity className="w-8 h-8 text-green-500" />,
            color: 'bg-green-50 border-green-100 hover:border-green-300',
            path: '/visalgo/pathfinding'
        },
        {
            id: 'binarysearch',
            title: 'Binary Search',
            description: 'See how the Divide and Conquer strategy finds elements in O(log n).',
            icon: <Activity className="w-8 h-8 text-pink-500" />,
            color: 'bg-pink-50 border-pink-100 hover:border-pink-300',
            path: '/visalgo/binary-search'
        },
        {
            id: 'trees',
            title: 'Binary Search Trees',
            description: 'See how insertions, deletions, and traversals work in a BST or AVL tree.',
            icon: <GitGraph className="w-8 h-8 text-purple-500" />,
            color: 'bg-purple-50 border-purple-100 hover:border-purple-300',
            path: '/visalgo/bst'
        },
        {
            id: 'graphs',
            title: 'Graph Traversal',
            description: 'Explore nodes and edges with interactive graph algorithms.',
            icon: <Share2 className="w-8 h-8 text-orange-500" />,
            color: 'bg-orange-50 border-orange-100 hover:border-orange-300',
            path: '/visalgo/graph'
        },
        {
            id: 'dp',
            title: 'Dynamic Programming',
            description: 'Understand overlapping subproblems with Fibonacci and Table filling.',
            icon: <Activity className="w-8 h-8 text-indigo-500" />,
            color: 'bg-indigo-50 border-indigo-100 hover:border-indigo-300',
            path: '/visalgo/dp'
        },
        {
            id: 'linkedlist',
            title: 'Linked Lists',
            description: 'Visualize Singly and Doubly Linked Lists with dynamic pointers and nodes.',
            icon: <Link2 className="w-8 h-8 text-cyan-500" />,
            color: 'bg-cyan-50 border-cyan-100 hover:border-cyan-300',
            path: '/visalgo/linked-list'
        },
        {
            id: 'stackqueue',
            title: 'Stacks & Queues',
            description: 'Master first-in-first-out and last-in-first-out data structures.',
            icon: <Layers className="w-8 h-8 text-rose-500" />,
            color: 'bg-rose-50 border-rose-100 hover:border-rose-300',
            path: '/visalgo/stack-queue'
        },
        {
            id: 'heap',
            title: 'Heaps',
            description: 'Visualize Max Heaps, Build Heap process, and priority queue logic.',
            icon: <Network className="w-8 h-8 text-amber-500" />,
            color: 'bg-amber-50 border-amber-100 hover:border-amber-300',
            path: '/visalgo/heap'
        },
        {
            id: 'convexhull',
            title: 'Convex Hull',
            description: 'Geometric visualization of the Graham Scan algorithm for finding boundaries.',
            icon: <Triangle className="w-8 h-8 text-teal-500" />,
            color: 'bg-teal-50 border-teal-100 hover:border-teal-300',
            path: '/visalgo/convex-hull'
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                        Visualize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Algorithms</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                        Algorithms shouldn't be black boxes. Watch them run step-by-step, understand their logic, and master the fundamentals of Computer Science.
                    </p>
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {algorithms.map((algo) => (
                        <Link
                            to={algo.path}
                            key={algo.id}
                            className={`group relative p-8 rounded-3xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${algo.color}`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {algo.icon}
                                </div>
                                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">
                                {algo.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {algo.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Coming Soon Section */}
            <div className="text-center pb-20">
                <p className="text-gray-500">More visualizations like Backtracking and Advanced Graph Algorithms coming soon.</p>
            </div>
        </div>
    );
};

export default VisAlgo;
