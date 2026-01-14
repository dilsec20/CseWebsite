// MyBlogs.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Code, BookOpen, Trophy, LogOut, Edit2, Trash2, Plus, MessageSquare, X, Image } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MyBlogs = ({ setAuth }) => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditor, setShowEditor] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const navigate = useNavigate();

    // Fetch user's blogs
    const fetchMyBlogs = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/blogs/user/my-posts`, {
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
            const response = await fetch(`${API_URL}/blogs/${id}`, {
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
                ? `${API_URL}/blogs/${editingBlog.blog_id}`
                : `${API_URL}/blogs`;

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
                    <Link to="/blog" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition">
                        <BookOpen className="h-5 w-5" /> Blog
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
                        <p className="text-gray-500 mt-1">Write professional blogs with images and formatting.</p>
                    </div>
                    <button
                        onClick={() => { setEditingBlog(null); setShowEditor(true); }}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        <Plus className="h-5 w-5" /> Create New
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
                        <p className="text-gray-500 mt-1 mb-6">Start a discussion or write an article to share with others.</p>
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
                                    <Link to={`/blog/${blog.blog_id}`} className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
                                        {blog.title}
                                    </Link>
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
                                <div
                                    className="text-gray-600 line-clamp-3 mb-4 prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                />
                                <div className="text-sm text-gray-400">
                                    Posted on {new Date(blog.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Editor Modal */}
            {showEditor && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg">{editingBlog ? 'Edit Post' : 'Create New Post'}</h3>
                            <button onClick={() => setShowEditor(false)} className="p-2 hover:bg-gray-200 rounded-full transition">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <BlogsForm
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

const BlogsForm = ({ initialData, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [content, setContent] = useState(initialData?.content || "");
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

            // Validate file size (5MB)
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

    // Quill modules configuration with custom image handler
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
                    {initialData ? 'Update Post' : 'Publish Post'}
                </button>
            </div>
        </form>
    );
};

export default MyBlogs;

