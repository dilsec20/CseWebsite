import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Calculator, Lightbulb, Zap, Search, ChevronDown, ChevronUp } from 'lucide-react';
import fundamentalsData from '../data/csFundamentals.json';

const CSFundamentalsTheory = () => {
    const [expandedTopic, setExpandedTopic] = useState(0); // Default open OS
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTopics = fundamentalsData.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.sections.some(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.theory.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <BookOpen className="h-8 w-8 text-purple-600" />
                            CS Fundamentals - Complete Theory
                        </h1>
                        <p className="text-gray-600">Core Concepts • OS • Networking • DBMS • OOPs</p>
                    </div>
                    <Link to="/knowledge-base" className="flex items-center text-purple-600 hover:underline font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search CS concepts, OS scheduling, database normalization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                    />
                </div>

                {/* Topics Container */}
                <div className="space-y-6">
                    {filteredTopics.length > 0 ? (
                        filteredTopics.map((topic, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                                {/* Topic Header */}
                                <button
                                    onClick={() => setExpandedTopic(expandedTopic === idx ? null : idx)}
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 p-5 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center">
                                        <BookOpen className="h-7 w-7 text-white mr-3 opacity-90" />
                                        <div>
                                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{topic.title}</h2>
                                            <p className="text-purple-100 text-xs mt-1">Foundational concepts & principles</p>
                                        </div>
                                    </div>
                                    {expandedTopic === idx ? (
                                        <ChevronUp className="h-6 w-6 text-white opacity-80" />
                                    ) : (
                                        <ChevronDown className="h-6 w-6 text-white opacity-80" />
                                    )}
                                </button>

                                {/* Sections List */}
                                {(expandedTopic === idx || searchTerm) && (
                                    <div className="p-6 space-y-10 animate-fadeIn">
                                        {topic.sections.map((section, sIdx) => (
                                            <div key={sIdx} className="relative pl-8 border-l-4 border-purple-500 hover:border-purple-600 transition-colors">
                                                {/* Number Badge */}
                                                <div className="absolute -left-[1.35rem] top-0 w-8 h-8 bg-purple-100 border-2 border-white shadow-sm rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                                                    {sIdx + 1}
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
                                                    {section.name}
                                                </h3>

                                                <div className="grid lg:grid-cols-2 gap-6">
                                                    {/* Theory Column */}
                                                    <div className="space-y-6">
                                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                <BookOpen className="h-3 w-3" /> Core Theory
                                                            </h4>
                                                            <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm lg:text-base">
                                                                {section.theory}
                                                            </p>
                                                        </div>

                                                        {section.formula && (
                                                            <div className="bg-purple-50 p-5 rounded-xl border-l-4 border-purple-500 shadow-sm transition hover:shadow-md">
                                                                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                    <Calculator className="h-3 w-3" /> Key Logic / Formula
                                                                </h4>
                                                                <pre className="text-purple-900 font-mono text-sm whitespace-pre-wrap font-semibold leading-relaxed">
                                                                    {section.formula}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Visual/Example Column */}
                                                    <div className="space-y-6">
                                                        <div className="bg-indigo-50 p-5 rounded-xl border-l-4 border-indigo-500 shadow-sm">
                                                            <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                <Lightbulb className="h-3 w-3" /> Practical Example
                                                            </h4>
                                                            <pre className="text-gray-800 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                                                {section.example}
                                                            </pre>
                                                        </div>

                                                        {section.shortcut && (
                                                            <div className="bg-amber-50 p-5 rounded-xl border-l-4 border-amber-400 shadow-sm">
                                                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                    <Zap className="h-3 w-3" /> Interview Tip / Shortcut
                                                                </h4>
                                                                <pre className="text-amber-900 whitespace-pre-wrap text-sm leading-relaxed font-medium">
                                                                    {section.shortcut}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                            <BookOpen className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-400">No results found</h3>
                            <p className="text-gray-400">Try searching for a different CS concept</p>
                        </div>
                    )}
                </div>

                {/* Quick Prep Tips */}

            </div>
        </div>
    );
};

export default CSFundamentalsTheory;
