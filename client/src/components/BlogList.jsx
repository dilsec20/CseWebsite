import React, { useEffect, useState } from 'react';
import { MessageSquare, ThumbsUp, PenTool, User, X, Clock } from 'lucide-react'; // Added Clock
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const BlogList = ({ user }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    // Filtered blogs for display (Codeforces style: Recent actions)
    const [recentBlogs, setRecentBlogs] = useState([]);

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${API_URL}/api/blogs/recent`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setBlogs(data);
                setRecentBlogs(data);
            } else {
                console.error("Invalid blogs data:", data);
                setBlogs([]);
                setRecentBlogs([]);
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleCreateBlog = async (title, content) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                toast.success("Blog posted successfully!");
                setShowEditor(false);
                fetchBlogs();
            } else {
                toast.error("Failed to post blog");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error posting blog");
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    Recent Discussions
                </h3>
                <button
                    onClick={() => setShowEditor(true)}
                    className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                >
                    <PenTool className="h-3 w-3" /> Write
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-0">
                {loading ? (
                    <div className="p-4 text-center text-gray-500">Loading discussions...</div>
                ) : recentBlogs.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">
                        <p>No discussions yet.</p>
                        <p className="text-xs mt-1">Be the first to modify the silence!</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {recentBlogs.map(blog => (
                            <div
                                key={blog.blog_id}
                                onClick={() => setSelectedBlog(blog)}
                                className="p-4 hover:bg-blue-50 transition cursor-pointer group"
                            >
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-700 text-sm mb-1 line-clamp-1">
                                    {blog.title}
                                </h4>
                                <div className="flex justify-between items-center text-xs text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 font-medium text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">
                                            <User className="h-3 w-3" /> {blog.author_name || 'Anonymous'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {new Date(blog.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {/* <span className="flex items-center gap-1 group-hover:text-blue-600">
                                        <ThumbsUp className="h-3 w-3" /> {blog.likes || 0}
                                    </span> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Write Blog Modal */}
            {showEditor && (
                <BlogEditor onClose={() => setShowEditor(false)} onSubmit={handleCreateBlog} />
            )}

            {/* Read Blog Modal */}
            {selectedBlog && (
                <BlogReader blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
            )}
        </div>
    );
};

const BlogEditor = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return toast.warning("Please fill all fields");
        onSubmit(title, content);
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b flex justify-between items-center">
                    <h3 className="font-bold text-lg">Start a Discussion</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition"><X className="h-5 w-5" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="What's on your mind?"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32 resize-none"
                            placeholder="Share your thoughts, ask a question, or explain a concept..."
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const BlogReader = ({ blog: initialBlog, onClose }) => {
    const [blog, setBlog] = useState(initialBlog);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                // Fetching single blog increments the view count on backend
                const response = await fetch(`${API_URL}/api/blogs/${initialBlog.blog_id}`);
                const data = await response.json();
                if (response.ok) {
                    setBlog(data);
                }
            } catch (err) {
                console.error("Failed to fetch blog details", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogDetails();
    }, [initialBlog.blog_id]);

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl animate-in fade-in zoom-in duration-200 max-h-[80vh] flex flex-col">
                <div className="p-6 border-b flex justify-between items-start bg-gray-50 rounded-t-2xl">
                    <div>
                        <h2 className="font-bold text-xl text-gray-900">{blog.title}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">@{blog.author_name}</span>
                            <span>•</span>
                            <span>{new Date(blog.created_at).toLocaleString()}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-gray-600" title="Views">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {blog.views || 0}
                            </span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition"><X className="h-6 w-6" /></button>
                </div>
                <div className="p-8 overflow-y-auto leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {blog.content}
                </div>
                <div className="p-4 border-t bg-gray-50 rounded-b-2xl text-right">
                    <button onClick={onClose} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">Close</button>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
