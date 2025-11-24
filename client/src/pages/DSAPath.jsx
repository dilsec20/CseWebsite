import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, ChevronRight, Layers, Cpu, Hash, AlignLeft, GitMerge } from 'lucide-react';
import { API_URL } from '../config';

const DSAPath = () => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await fetch(`${API_URL}/api/dsa/modules`);
            const data = await response.json();
            setModules(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const getIcon = (title) => {
        if (title.includes('Logic')) return <Cpu className="h-6 w-6 text-blue-600" />;
        if (title.includes('Time')) return <Layers className="h-6 w-6 text-purple-600" />;
        if (title.includes('Array')) return <Hash className="h-6 w-6 text-green-600" />;
        if (title.includes('String')) return <AlignLeft className="h-6 w-6 text-yellow-600" />;
        if (title.includes('Linked')) return <GitMerge className="h-6 w-6 text-red-600" />;
        return <BookOpen className="h-6 w-6 text-gray-600" />;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">DSA Learning Path</h1>
                    <p className="text-xl text-gray-600">From Logic Building to Advanced Algorithms. Master it all.</p>
                </div>

                <div className="space-y-6">
                    {modules.map((module, index) => (
                        <Link
                            key={module.module_id}
                            to={`/dsa/module/${module.module_id}`}
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
                                <ChevronRight className="h-6 w-6 text-gray-400" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DSAPath;
