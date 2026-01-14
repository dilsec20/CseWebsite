import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, Search, BookOpen, Lightbulb, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import aptitudeData from '../data/aptitudeTopics.json';

const ReasoningTheory = () => {
    const [expandedTopic, setExpandedTopic] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter for reasoning-specific topics from the shared JSON
    const reasoningTopics = aptitudeData.filter(topic =>
        topic.title.toLowerCase().includes('reasoning') ||
        topic.title.toLowerCase().includes('puzzles') ||
        topic.title.toLowerCase().includes('clocks') ||
        topic.title.toLowerCase().includes('logical')
    );

    const filteredTopics = reasoningTopics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.sections.some(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.theory.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <Brain className="h-8 w-8 text-green-600" />
                            Reasoning - Complete Theory
                        </h1>
                        <p className="text-gray-600">Logical Deduction • Verbal Reasoning • Puzzles • Patterns</p>
                    </div>
                    <Link to="/knowledge-base" className="flex items-center text-green-600 hover:underline font-medium">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Link>
                </div>

                {/* Search */}
                <div className="mb-6 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search reasoning concepts, blood relations, puzzles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                    />
                </div>

                {/* Topics */}
                <div className="space-y-6">
                    {filteredTopics.length > 0 ? (
                        filteredTopics.map((topic, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                                <button
                                    onClick={() => setExpandedTopic(expandedTopic === idx ? null : idx)}
                                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 p-5 flex items-center justify-between text-left"
                                >
                                    <div className="flex items-center">
                                        <Brain className="h-7 w-7 text-white mr-3 opacity-90" />
                                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">{topic.title}</h2>
                                        <span className="ml-3 px-2 py-0.5 bg-white/20 rounded-full text-white text-xs font-semibold">
                                            {topic.sections.length} categories
                                        </span>
                                    </div>
                                    {expandedTopic === idx ? (
                                        <ChevronUp className="h-6 w-6 text-white opacity-80" />
                                    ) : (
                                        <ChevronDown className="h-6 w-6 text-white opacity-80" />
                                    )}
                                </button>

                                {(expandedTopic === idx || searchTerm) && (
                                    <div className="p-6 space-y-10">
                                        {topic.sections.map((section, sIdx) => (
                                            <div key={sIdx} className="relative pl-8 border-l-4 border-green-500">
                                                <div className="absolute -left-[1.35rem] top-0 w-8 h-8 bg-green-100 border-2 border-white shadow-sm rounded-full flex items-center justify-center text-green-700 font-bold text-sm">
                                                    {sIdx + 1}
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-5">{section.name}</h3>

                                                <div className="grid lg:grid-cols-2 gap-6">
                                                    <div className="space-y-6">
                                                        <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Concept</h4>
                                                            <p className="text-gray-700 whitespace-pre-line text-sm lg:text-base">
                                                                {section.theory}
                                                            </p>
                                                        </div>
                                                        {section.formula && (
                                                            <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
                                                                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2 text-blue-600">Approach / Logic</h4>
                                                                <pre className="text-blue-900 font-mono text-sm whitespace-pre-wrap font-semibold">
                                                                    {section.formula}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="space-y-6">
                                                        <div className="bg-emerald-50 p-5 rounded-xl border-l-4 border-emerald-500">
                                                            <h4 className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Detailed Example</h4>
                                                            <pre className="text-gray-800 whitespace-pre-wrap font-mono text-sm">
                                                                {section.example}
                                                            </pre>
                                                        </div>
                                                        {section.shortcut && (
                                                            <div className="bg-amber-50 p-5 rounded-xl border-l-4 border-amber-400">
                                                                <h4 className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-2">Pro Tip</h4>
                                                                <pre className="text-amber-900 whitespace-pre-wrap text-sm font-medium">
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
                        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
                            <Brain className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-500 font-medium">No reasoning topics found. Check back later!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReasoningTheory;
