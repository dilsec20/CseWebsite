// MyBlogs.jsx - Your Discussion Posts (Simple text, no rich editor)
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Code, BookOpen, Trophy, LogOut, Edit2, Trash2, Plus, MessageSquare, X } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const MyBlogs = ({ setAuth }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const navigate = useNavigate();

    // Fetch user's discussion posts
    const fetchMyBlogs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/blogs/user/my-posts`, {
                headers: { token: token }
            });

            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            } else {
                toast.error("Failed to fetch your posts");
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error("Error fetching posts");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/blogs/${id}`, {
                method: "DELETE",
                headers: { token: token }
            });

            if (response.ok) {
                toast.success("Post deleted successfully");
                setBlogs(blogs.filter(blog => blog.blog_id !== id));
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to delete post");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error deleting post");
        }
    };

    const handleEditStart = (blog) => {
        setEditingBlog(blog);
        setShowEditor(true);
    };

    const handleSave = async (title, content) => {
        try {
            const token = localStorage.getItem("token");
            const url = editingBlog
                ? `${API_URL}/api/blogs/${editingBlog.blog_id}`
                : `${API_URL}/api/blogs`;

            const method = editingBlog ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                toast.success(editingBlog ? "Post updated!" : "Post created!");
                setShowEditor(false);
                setEditingBlog(null);
                fetchMyBlogs();
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to save post");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error saving post");
        }
    };

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        if (setAuth) setAuth(false);
        navigate('/login');
        toast.success("Logged out successfully");
    };

    // Strip HTML tags for preview
    const stripHtml = (html) => {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, '');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                        <Code className="h-6 w-6" /> AceCoder
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <LayoutDashboard className="h-5 w-5" /> Dashboard
                    </Link>
                    <Link to="/problems" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <Code className="h-5 w-5" /> Problems
                    </Link>
                    <Link to="/knowledge-base" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <BookOpen className="h-5 w-5" /> Knowledge Base
                    </Link>
                    <Link to="/contests" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <Trophy className="h-5 w-5" /> Contests
                    </Link>
                    <Link to="/my-blogs" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-medium transition">
                        <MessageSquare className="h-5 w-5" /> Your Posts
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={e => logout(e)}
                        className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium w-full transition"
                    >
                        <LogOut className="h-5 w-5" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Posts</h1>
                        <p className="text-gray-500 mt-1">Manage your discussions and quick posts.</p>
                    </div>
                    <button
                        onClick={() => { setEditingBlog(null); setShowEditor(true); }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        <Plus className="h-5 w-5" /> New Discussion
                    </button>
                </header>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading posts...</div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-gray-100 rounded-full">
                                <MessageSquare className="h-8 w-8 text-gray-400" />
                            </div>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
                        <p className="text-gray-500 mt-1 mb-6">Start a discussion to share your thoughts!</p>
                        <button
                            onClick={() => { setEditingBlog(null); setShowEditor(true); }}
                            className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                        >
                            Create your first post
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {blogs.map(blog => (
                            <div key={blog.blog_id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{blog.title}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditStart(blog)}
                                            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                            title="Edit"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog.blog_id)}
                                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600 line-clamp-3 mb-4">{stripHtml(blog.content)}</p>
                                <div className="text-sm text-gray-400">
                                    Posted on {new Date(blog.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Simple Editor Modal */}
            {showEditor && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="font-bold text-lg">{editingBlog ? 'Edit Discussion' : 'New Discussion'}</h3>
                            <button onClick={() => setShowEditor(false)} className="p-1 hover:bg-gray-100 rounded-full transition">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <SimpleEditor
                            initialData={editingBlog}
                            onSubmit={handleSave}
                            onCancel={() => setShowEditor(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple text-based editor (no rich text)
const SimpleEditor = ({ initialData, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.warning("Please fill in both title and content");
            return;
        }
        onSubmit(title, content);
    };

    return (
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
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-40 resize-none"
                    placeholder="Share your thoughts, ask a question, or explain something..."
                />
            </div>
            <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={onCancel} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                    {initialData ? 'Update' : 'Post'}
                </button>
            </div>
        </form>
    );
};

export default MyBlogs;
