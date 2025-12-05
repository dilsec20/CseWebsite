import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Code, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { API_URL } from '../config';

const DSAModule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [module, setModule] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModuleData();
    }, [id]);

    const fetchModuleData = async () => {
        try {
            const response = await fetch(`${API_URL}/api/dsa/modules/${id}`);
            const data = await response.json();
            setModule(data);
            if (data.topics.length > 0) {
                fetchTopicContent(data.topics[0].topic_id);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const fetchTopicContent = async (topicId) => {
        try {
            const response = await fetch(`${API_URL}/api/dsa/topics/${topicId}`);
            const data = await response.json();
            setSelectedTopic(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Improved Markdown Parser
    const renderContent = (content) => {
        if (!content) return null;

        const lines = content.split('\n');
        const elements = [];
        let inCodeBlock = false;
        let codeBuffer = [];

        lines.forEach((line, idx) => {
            if (line.startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    elements.push(
                        <div key={`code-${idx}`} className="bg-gray-900 text-gray-100 font-mono p-4 rounded-lg text-sm my-4 overflow-x-auto shadow-inner">
                            <pre>{codeBuffer.join('\n')}</pre>
                        </div>
                    );
                    codeBuffer = [];
                }
                inCodeBlock = !inCodeBlock;
                return;
            }

            if (inCodeBlock) {
                codeBuffer.push(line);
                return;
            }

            // Regular Markdown
            if (line.startsWith('# ')) elements.push(<h1 key={idx} className="text-3xl font-bold text-gray-900 mt-8 mb-4 border-b pb-2">{line.replace('# ', '')}</h1>);
            else if (line.startsWith('## ')) elements.push(<h2 key={idx} className="text-2xl font-bold text-gray-800 mt-6 mb-3">{line.replace('## ', '')}</h2>);
            else if (line.startsWith('### ')) elements.push(<h3 key={idx} className="text-xl font-bold text-gray-800 mt-4 mb-2">{line.replace('### ', '')}</h3>);
            else if (line.startsWith('- ')) {
                // Handle links in list items
                const content = line.replace('- ', '');
                const linkMatch = content.match(/\[(.*?)\]\((.*?)\)/);
                if (linkMatch) {
                    const [, text, url] = linkMatch;
                    const isExternal = url.startsWith('http://') || url.startsWith('https://');

                    // Extract platform and difficulty info after the link
                    const afterLink = content.substring(content.indexOf(')') + 1).trim();

                    if (isExternal) {
                        elements.push(
                            <li key={idx} className="ml-4 text-gray-700 mb-2 list-disc list-inside flex items-center justify-between">
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline font-medium"
                                >
                                    {text}
                                </a>
                                {afterLink && <span className="text-sm text-gray-500 ml-2">{afterLink}</span>}
                            </li>
                        );
                    } else {
                        elements.push(
                            <li key={idx} className="ml-4 text-gray-700 mb-2 list-disc list-inside">
                                <Link to={url} className="text-blue-600 hover:underline font-medium">
                                    {text}
                                </Link>
                                {afterLink && <span className="text-sm text-gray-500 ml-2">{afterLink}</span>}
                            </li>
                        );
                    }
                } else {
                    elements.push(<li key={idx} className="ml-4 text-gray-700 mb-1 list-disc list-inside">{content}</li>);
                }
            }
            else if (line.trim() === '') elements.push(<br key={idx} />);
            else elements.push(<p key={idx} className="text-gray-700 mb-2 leading-relaxed">{line}</p>);
        });

        return elements;
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!module) return <div className="min-h-screen flex items-center justify-center">Module not found</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto hidden md:block">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/dsa-path" className="text-sm text-blue-600 font-medium hover:underline mb-2 block">&larr; Back to Path</Link>
                    <h2 className="text-xl font-bold text-gray-900">{module.title}</h2>
                </div>
                <div className="p-4">
                    {module.topics.map((topic, idx) => (
                        <button
                            key={topic.topic_id}
                            onClick={() => fetchTopicContent(topic.topic_id)}
                            className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center justify-between transition ${selectedTopic?.topic_id === topic.topic_id
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-400">{idx + 1}.</span>
                                {topic.title}
                            </span>
                            {selectedTopic?.topic_id === topic.topic_id && <ChevronRight className="h-4 w-4" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {selectedTopic ? (
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                            {selectedTopic.video_url && (
                                <div className={`mb-8 ${selectedTopic.video_url.includes(',') ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200'}`}>
                                    {selectedTopic.video_url.split(',').map((url, idx) => (
                                        <div key={idx} className={`${selectedTopic.video_url.includes(',') ? 'aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200' : 'w-full h-full'}`}>
                                            <iframe
                                                src={url.trim().replace('watch?v=', 'embed/')}
                                                title={`${selectedTopic.title} ${idx + 1}`}
                                                className="w-full h-full"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="prose prose-blue max-w-none">
                                {renderContent(selectedTopic.content)}
                            </div>

                            {selectedTopic.problem_id && (
                                <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between">
                                    <div>
                                        <h4 className="text-lg font-bold text-blue-900 mb-1">Ready to practice?</h4>
                                        <p className="text-blue-700">Solve the related problem to test your understanding.</p>
                                    </div>
                                    <Link
                                        to={`/problems/${selectedTopic.problem_id}`}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex items-center gap-2"
                                    >
                                        <Code className="h-5 w-5" />
                                        Solve Problem
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Navigation Footer */}
                        <div className="mt-8 flex justify-between items-center">
                            <button className="px-4 py-2 text-gray-500 hover:text-gray-900 font-medium flex items-center gap-2 disabled:opacity-50">
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </button>
                            <button className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                                Next Topic <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">Select a topic</div>
                )}
            </div>
        </div>
    );
};

export default DSAModule;
