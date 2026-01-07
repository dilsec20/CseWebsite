import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Code, ChevronRight, ChevronLeft, CheckCircle, Lock, Save, FileText, Edit3, Trash2 } from 'lucide-react';
import { API_URL } from '../config';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DSAModule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [module, setModule] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [solvedProblems, setSolvedProblems] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Notes state
    const [userNote, setUserNote] = useState('');
    const [noteSaving, setNoteSaving] = useState(false);
    const [noteLastSaved, setNoteLastSaved] = useState(null);
    const [showNotesView, setShowNotesView] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    useEffect(() => {
        fetchModuleData();
    }, [id]);

    // Fetch user notes when module changes (for authenticated users)
    useEffect(() => {
        if (isAuthenticated && id) {
            fetchUserNote();
        }
    }, [id, isAuthenticated]);

    const fetchUserNote = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch(`${API_URL}/api/dsa/notes/${id}`, {
                headers: { token }
            });
            if (response.ok) {
                const data = await response.json();
                setUserNote(data.content || '');
                setNoteLastSaved(data.updated_at);
                setIsEditingNote(!data.content || data.content.trim() === '');
            }
        } catch (err) {
            console.error('Error fetching note:', err);
        }
    };

    const saveUserNote = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            setNoteSaving(true);
            const response = await fetch(`${API_URL}/api/dsa/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token
                },
                body: JSON.stringify({ content: userNote })
            });
            if (response.ok) {
                setNoteLastSaved(new Date().toISOString());
                setIsEditingNote(false);
            }
        } catch (err) {
            console.error('Error saving note:', err);
        } finally {
            setNoteSaving(false);
        }
    };

    // Fetch solved problems when topic changes
    useEffect(() => {
        if (selectedTopic && isAuthenticated) {
            fetchSolvedProblems();
        }
    }, [selectedTopic, isAuthenticated]);

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

    const fetchSolvedProblems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/dsa/progress/${selectedTopic.topic_id}`, {
                headers: { 'token': token }
            });
            if (response.ok) {
                const data = await response.json();
                const solved = {};
                data.forEach(url => { solved[url] = true; });
                setSolvedProblems(solved);
            }
        } catch (err) {
            console.error('Error fetching progress:', err);
        }
    };

    const toggleProblemSolved = async (problemUrl) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        const wasChecked = solvedProblems[problemUrl];
        setSolvedProblems(prev => ({
            ...prev,
            [problemUrl]: !wasChecked
        }));

        try {
            const token = localStorage.getItem('token');
            await fetch(`${API_URL}/api/dsa/progress`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    topic_id: selectedTopic.topic_id,
                    problem_url: problemUrl
                })
            });
        } catch (err) {
            // Revert on error
            setSolvedProblems(prev => ({
                ...prev,
                [problemUrl]: wasChecked
            }));
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!module) return <div className="min-h-screen flex items-center justify-center">Module not found</div>;

    const handleNext = () => {
        if (!module || !selectedTopic) return;
        const currentIndex = module.topics.findIndex(t => t.topic_id === selectedTopic.topic_id);
        if (currentIndex < module.topics.length - 1) {
            fetchTopicContent(module.topics[currentIndex + 1].topic_id);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevious = () => {
        if (!module || !selectedTopic) return;
        const currentIndex = module.topics.findIndex(t => t.topic_id === selectedTopic.topic_id);
        if (currentIndex > 0) {
            fetchTopicContent(module.topics[currentIndex - 1].topic_id);
            window.scrollTo(0, 0);
        }
    };

    const getCurrentIndex = () => {
        if (!module || !selectedTopic) return -1;
        return module.topics.findIndex(t => t.topic_id === selectedTopic.topic_id);
    };

    const isFirstTopic = getCurrentIndex() === 0;
    const isLastTopic = module && getCurrentIndex() === module.topics.length - 1;

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
                            onClick={() => {
                                setShowNotesView(false);
                                fetchTopicContent(topic.topic_id);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center justify-between transition ${selectedTopic?.topic_id === topic.topic_id && !showNotesView
                                ? 'bg-blue-50 text-blue-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-xs font-mono text-gray-400">{idx + 1}.</span>
                                {topic.title}
                            </span>
                            {selectedTopic?.topic_id === topic.topic_id && !showNotesView && <ChevronRight className="h-4 w-4" />}
                        </button>
                    ))}

                    {/* My Notes Sidebar Item - Only for authenticated users */}
                    {isAuthenticated && (
                        <button
                            onClick={() => {
                                setShowNotesView(true);
                                setSelectedTopic(null);
                            }}
                            className={`w-full text-left px-4 py-3 rounded-lg mb-1 flex items-center justify-between transition ${showNotesView
                                ? 'bg-purple-50 text-purple-700 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <FileText className="h-4 w-4 text-purple-500" />
                                My Notes
                            </span>
                            {showNotesView && <ChevronRight className="h-4 w-4" />}
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
                {showNotesView ? (
                    /* Notes View */
                    <div className="max-w-4xl mx-auto px-8 py-12">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                            <div className="flex items-center gap-3 mb-6">
                                <FileText className="h-8 w-8 text-purple-600" />
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
                                    <p className="text-gray-500 text-sm">Personal notes for {module.title}</p>
                                </div>
                            </div>

                            {noteLastSaved && (
                                <p className="text-xs text-gray-400 mb-4">
                                    Last saved: {new Date(noteLastSaved).toLocaleString()}
                                </p>
                            )}

                            <p className="text-gray-600 mb-4">
                                Write your personal notes, tricks, and key concepts for this module. Perfect for revision!
                            </p>

                            {isEditingNote ? (
                                <>
                                    <textarea
                                        value={userNote}
                                        onChange={(e) => setUserNote(e.target.value)}
                                        placeholder="Add your notes here...\n\n• Quick tricks\n• Important formulas\n• Key concepts to remember"
                                        className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-y text-gray-800 bg-gray-50 font-mono text-sm"
                                    />
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={saveUserNote}
                                            disabled={noteSaving}
                                            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50 font-medium"
                                        >
                                            <Save className="h-4 w-4" />
                                            {noteSaving ? 'Saving...' : 'Save Notes'}
                                        </button>
                                        {userNote && noteLastSaved && (
                                            <button
                                                onClick={() => setIsEditingNote(false)}
                                                className="px-6 py-2.5 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition font-medium"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    {userNote ? (
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[200px] whitespace-pre-wrap font-mono text-sm text-gray-800">
                                            {userNote}
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 min-h-[100px] flex items-center justify-center text-gray-400">
                                            No notes yet. Click Edit to add some!
                                        </div>
                                    )}
                                    <div className="mt-4 flex gap-3">
                                        <button
                                            onClick={() => setIsEditingNote(true)}
                                            className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 font-medium"
                                        >
                                            <Edit3 className="h-4 w-4" />
                                            Edit
                                        </button>
                                        {userNote && (
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete your notes?')) {
                                                        setUserNote('');
                                                        setIsEditingNote(true);
                                                    }
                                                }}
                                                className="px-6 py-2.5 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition flex items-center gap-2 font-medium"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ) : selectedTopic ? (
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
                                <ReactMarkdown
                                    remarkPlugins={[remarkMath, remarkGfm]}
                                    rehypePlugins={[rehypeKatex]}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            const match = /language-(\w+)/.exec(className || '');
                                            return !inline && match ? (
                                                <div className="rounded-xl overflow-hidden my-6 shadow-md border border-gray-800">
                                                    <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
                                                        <div className="flex gap-1.5">
                                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                        </div>
                                                        <span className="text-xs font-mono text-gray-400">{match[1]}</span>
                                                    </div>
                                                    <SyntaxHighlighter
                                                        style={vscDarkPlus}
                                                        language={match[1]}
                                                        PreTag="div"
                                                        customStyle={{ margin: 0, borderRadius: 0 }}
                                                        {...props}
                                                    >
                                                        {String(children).replace(/\n$/, '')}
                                                    </SyntaxHighlighter>
                                                </div>
                                            ) : (
                                                <code className={`${className} bg-gray-100 text-red-600 px-1.5 py-0.5 rounded-md font-mono text-sm border border-gray-200`} {...props}>
                                                    {children}
                                                </code>
                                            );
                                        },
                                        h1: ({ node, ...props }) => <h1 className="text-3xl font-extrabold text-blue-900 mt-10 mb-6 pb-2 border-b-2 border-blue-100" {...props} />,
                                        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4 flex items-center gap-2" {...props} />,
                                        h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-gray-700 mt-6 mb-3" {...props} />,
                                        p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4 text-lg" {...props} />,
                                        ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-6 space-y-2 mb-6 text-gray-700" {...props} />,
                                        ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-6 space-y-2 mb-6 text-gray-700" {...props} />,
                                        li: ({ node, children, ...props }) => {
                                            const childrenArray = React.Children.toArray(children);
                                            const firstChild = childrenArray[0];

                                            // Check if this is a task list item (first child is an input checkbox from remarkGfm)
                                            const isTaskListItem = firstChild?.props?.type === 'checkbox' ||
                                                (typeof firstChild === 'object' && firstChild?.type === 'input');

                                            // Only render interactive checkbox for task list items with links
                                            if (isTaskListItem) {
                                                // Extract problem key and platform info
                                                let problemKey = null;
                                                let linkElement = null;
                                                let platformInfo = [];

                                                childrenArray.forEach((child, idx) => {
                                                    if (idx === 0) return; // Skip checkbox
                                                    if (child?.props?.href) {
                                                        problemKey = child.props.href;
                                                        linkElement = child;
                                                    } else if (typeof child === 'string') {
                                                        // Extract platform info after the link (e.g., "- LeetCode Easy" or "Amazon, Microsoft")
                                                        const trimmed = child.trim();
                                                        if (trimmed && trimmed !== '-') {
                                                            platformInfo.push(trimmed.replace(/^-\s*/, ''));
                                                        }
                                                    }
                                                });

                                                if (problemKey) {
                                                    const isChecked = solvedProblems[problemKey] || false;
                                                    const platformText = platformInfo.join(' ').trim();

                                                    return (
                                                        <li className="pl-1 flex items-center justify-between gap-2" {...props}>
                                                            <div className="flex items-center gap-2">
                                                                {isAuthenticated ? (
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={isChecked}
                                                                        onChange={() => toggleProblemSolved(problemKey)}
                                                                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 cursor-pointer flex-shrink-0"
                                                                    />
                                                                ) : (
                                                                    <button
                                                                        onClick={() => navigate('/login')}
                                                                        className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-blue-500 flex-shrink-0"
                                                                        title="Login to track progress"
                                                                    >
                                                                        <Lock className="w-3 h-3" />
                                                                    </button>
                                                                )}
                                                                <span className={isChecked ? 'line-through text-gray-400' : ''}>
                                                                    {linkElement}
                                                                </span>
                                                            </div>
                                                            {platformText && (
                                                                <span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                                                                    {platformText}
                                                                </span>
                                                            )}
                                                        </li>
                                                    );
                                                }
                                            }

                                            return <li className="pl-1" {...props}>{children}</li>;
                                        },
                                        a: ({ node, href, children, ...props }) => (
                                            <a
                                                href={href}
                                                className="!text-blue-600 font-bold hover:!text-blue-800 hover:!underline transition-colors duration-200 inline-flex items-center gap-1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                {...props}
                                            >
                                                {children} <ChevronRight className="h-3 w-3" />
                                            </a>
                                        ),
                                        blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 rounded-r-lg italic text-gray-700" {...props} />,
                                        strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                    }}
                                >
                                    {selectedTopic.content}
                                </ReactMarkdown>
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
                            <button
                                onClick={handlePrevious}
                                disabled={isFirstTopic}
                                className={`px-4 py-2 font-medium flex items-center gap-2 transition ${isFirstTopic
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                <ChevronLeft className="h-4 w-4" /> Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={isLastTopic}
                                className={`px-4 py-2 font-medium flex items-center gap-2 transition ${isLastTopic
                                    ? 'text-gray-300 cursor-not-allowed'
                                    : 'text-blue-600 hover:text-blue-700'}`}
                            >
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
