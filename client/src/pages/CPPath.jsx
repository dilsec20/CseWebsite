import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, ChevronRight, Layers, Cpu, Hash, AlignLeft, GitMerge, Award, Calculator, Search, Share2, TreeDeciduous } from 'lucide-react';
import { API_URL } from '../config';
import GoogleAd from '../components/GoogleAd';

const CPPath = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await fetch(`${API_URL}/api/cp/modules`);
            const data = await response.json();
            setModules(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const getIcon = (title) => {
        if (title.includes('Number')) return <Calculator className="h-6 w-6 text-blue-600" />;
        if (title.includes('Bit')) return <Cpu className="h-6 w-6 text-purple-600" />;
        if (title.includes('Combinatorics')) return <Hash className="h-6 w-6 text-green-600" />;
        if (title.includes('Graph')) return <Share2 className="h-6 w-6 text-orange-600" />;
        if (title.includes('Tree')) return <TreeDeciduous className="h-6 w-6 text-emerald-600" />;
        if (title.includes('String')) return <AlignLeft className="h-6 w-6 text-red-600" />;
        if (title.includes('Game')) return <Award className="h-6 w-6 text-yellow-600" />;
        if (title.includes('Search')) return <Search className="h-6 w-6 text-indigo-600" />;
        if (title.includes('Constructive')) return <Layers className="h-6 w-6 text-pink-600" />;
        return <BookOpen className="h-6 w-6 text-gray-600" />;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (

        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center max-w-[1600px] mx-auto">
                {/* Left Ad - Visible on XL screens */}
                <div className="hidden xl:block w-[160px] flex-shrink-0 sticky top-20 h-[calc(100vh-80px)] p-2">
                    <GoogleAd slot="1234567890" className="h-full w-full" />
                </div>

                {/* Main Content */}
                <div className="max-w-5xl w-full mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Competitive Programming Path</h1>
                        <p className="text-xl text-gray-600">From Number Theory to Advanced Topics. Master the algorithms.</p>
                    </div>

                    <div className="space-y-6">
                        {modules.map((module, index) => (
                            <Link
                                key={module.module_id}
                                to={`/cp/module/${module.module_id}`}
                                className="block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-300 overflow-hidden"
                            >
                                <div className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center border border-gray-100">
                                            {getIcon(module.title)}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                                                {index + 1}. {module.title}
                                            </h3>
                                            <p className="text-gray-600">{module.description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                            {['Basic', 'Intermediate', 'Advanced'][Math.floor(index / 5)] || 'Advanced'}
                                        </span>
                                        <ChevronRight className="h-6 w-6 text-gray-400" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Ad - Visible on XL screens */}
                <div className="hidden xl:block w-[160px] flex-shrink-0 sticky top-20 h-[calc(100vh-80px)] p-2">
                    <GoogleAd slot="1234567890" className="h-full w-full" />
                </div>
            </div>
        </div>
    );
};

export default CPPath;
