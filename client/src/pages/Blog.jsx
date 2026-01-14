import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Eye, ThumbsUp, Calendar, User, ArrowRight, PenTool, X, Image } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const navigate = useNavigate();

    const isAuthenticated = !!localStorage.getItem('token');

    const fetchBlogs = async () => {
        try {
            const res = await fetch(`${API_URL}/blogs/recent`);
            const data = await res.json();
            setBlogs(data);
        } catch (err) {
            console.error("Failed to fetch blogs:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleWriteClick = () => {
        if (!isAuthenticated) {
            toast.info("Please login to write a blog");
            navigate('/login');
            return;
        }
        setShowEditor(true);
    };

    const handleSave = async (title, content) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/blogs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify({ title, content })
            });

            if (response.ok) {
                toast.success("Blog published!");
                setShowEditor(false);
                fetchBlogs(); // Refresh the list
            } else {
                const data = await response.json();
                toast.error(data.error || "Failed to publish blog");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error publishing blog");
        }
    };

    // Helper to create excerpt from content
    const createExcerpt = (content, maxLength = 150) => {
        if (!content) return '';
        const stripped = content.replace(/<[^>]+>/g, ''); // Remove HTML tags
        return stripped.length > maxLength
            ? stripped.substring(0, maxLength) + '...'
            : stripped;
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Hero Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-12 w-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                    <BookOpen className="h-6 w-6 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-slate-900">AceCoder Blog</h1>
                            </div>
                            <p className="text-slate-600 max-w-xl">
                                Insights, tutorials, and stories from the competitive programming community.
                                Learn DSA, master algorithms, and ace your coding interviews.
                            </p>
                        </div>
                        <button
                            onClick={handleWriteClick}
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition shadow-lg"
                        >
                            <PenTool className="h-4 w-4" />
                            Write a Blog
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Blog List - Main Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {loading ? (
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
                                        <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-slate-100 rounded w-2/3"></div>
                                    </div>
                                ))}
                            </div>
                        ) : blogs.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
                                <BookOpen className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-slate-700 mb-2">No blogs yet</h3>
                                <p className="text-slate-500 mb-6">Be the first to share your knowledge with the community!</p>
                                <button
                                    onClick={handleWriteClick}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                                >
                                    <PenTool className="h-4 w-4" />
                                    Write a Blog
                                </button>
                            </div>
                        ) : (
                            blogs.map(blog => (
                                <Link
                                    key={blog.blog_id}
                                    to={`/blog/${blog.blog_id}`}
                                    className="block bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
                                >
                                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-slate-600 mb-4 leading-relaxed">
                                        {createExcerpt(blog.content)}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                <User className="h-4 w-4" />
                                                {blog.author_name}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="h-4 w-4" />
                                                {formatDate(blog.created_at)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-4 w-4" />
                                                {blog.views || 0}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <ThumbsUp className="h-4 w-4" />
                                                {blog.likes || 0}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center gap-1 text-blue-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                        Read more <ArrowRight className="h-4 w-4" />
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Sidebar - Ad & Info */}
                    <div className="space-y-6">
                        {/* Ad Placeholder */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="text-xs text-slate-400 uppercase tracking-wide mb-3">Advertisement</div>
                            <div
                                id="blog-sidebar-ad"
                                className="rounded-xl overflow-hidden min-h-[250px]"
                            >
                                {/* AdSense Auto Ad */}
                                <ins className="adsbygoogle"
                                    style={{ display: 'block' }}
                                    data-ad-client="ca-pub-6770525539785120"
                                    data-ad-slot="auto"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"></ins>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-4">Quick Links</h3>
                            <div className="space-y-3">
                                <Link to="/problems" className="block text-slate-600 hover:text-blue-600 transition">
                                    → Practice Problems
                                </Link>
                                <Link to="/dsa-path" className="block text-slate-600 hover:text-blue-600 transition">
                                    → DSA Learning Path
                                </Link>
                                <Link to="/cp-sheet" className="block text-slate-600 hover:text-blue-600 transition">
                                    → CP Problem Sheet
                                </Link>
                                <Link to="/contests" className="block text-slate-600 hover:text-blue-600 transition">
                                    → Live Contests
                                </Link>
                            </div>
                        </div>

                        {/* Another Ad Placeholder */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                            <div className="text-xs text-slate-400 uppercase tracking-wide mb-3">Sponsored</div>
                            <div
                                id="blog-sidebar-ad-2"
                                className="rounded-xl overflow-hidden min-h-[200px]"
                            >
                                {/* AdSense Auto Ad */}
                                <ins className="adsbygoogle"
                                    style={{ display: 'block' }}
                                    data-ad-client="ca-pub-6770525539785120"
                                    data-ad-slot="auto"
                                    data-ad-format="auto"
                                    data-full-width-responsive="true"></ins>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Editor Modal */}
            {showEditor && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg">Write a New Blog</h3>
                            <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <BlogEditor
                            onSubmit={handleSave}
                            onCancel={() => setShowEditor(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Blog Editor Component
const BlogEditor = ({ onSubmit, onCancel }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [uploading, setUploading] = useState(false);
    const quillRef = React.useRef(null);

    // Custom image handler for Cloudinary upload
    const imageHandler = React.useCallback(() => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image must be less than 5MB");
                return;
            }

            setUploading(true);
            const formData = new FormData();
            formData.append('image', file);

            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_URL}/upload/image`, {
                    method: 'POST',
                    headers: { token },
                    body: formData
                });

                const data = await res.json();

                if (data.success && data.url) {
                    const quill = quillRef.current?.getEditor();
                    if (quill) {
                        const range = quill.getSelection(true);
                        quill.insertEmbed(range.index, 'image', data.url);
                        quill.setSelection(range.index + 1);
                    }
                    toast.success("Image uploaded!");
                } else {
                    toast.error(data.error || "Failed to upload image");
                }
            } catch (err) {
                console.error("Upload error:", err);
                toast.error("Failed to upload image");
            } finally {
                setUploading(false);
            }
        };
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                ['blockquote', 'code-block'],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: imageHandler
            }
        }
    }), [imageHandler]);

    const formats = [
        'header', 'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'list', 'bullet', 'indent',
        'blockquote', 'code-block',
        'link', 'image'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            toast.warning("Please fill in both title and content");
            return;
        }
        onSubmit(title, content);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-[calc(90vh-80px)]">
            <div className="p-6 space-y-4 flex-1 overflow-y-auto">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium"
                        placeholder="Enter a compelling title..."
                        autoFocus
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Content
                        <span className="text-gray-400 font-normal ml-2">(Use toolbar to add images, format text)</span>
                    </label>
                    <div className="border border-gray-200 rounded-xl overflow-hidden relative">
                        {uploading && (
                            <div className="absolute inset-0 bg-white/80 z-10 flex items-center justify-center">
                                <div className="flex items-center gap-2 text-blue-600">
                                    <div className="animate-spin h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                                    Uploading image...
                                </div>
                            </div>
                        )}
                        <ReactQuill
                            ref={quillRef}
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            formats={formats}
                            placeholder="Write your blog post here... Click the image icon to upload images"
                            className="h-80"
                        />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                        <Image className="h-3 w-3" />
                        Click the image icon in toolbar to upload images directly (max 5MB)
                    </p>
                </div>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition shadow-sm"
                >
                    Publish Blog
                </button>
            </div>
        </form>
    );
};

export default Blog;
