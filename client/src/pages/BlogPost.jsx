import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, ThumbsUp, Calendar, User, MessageSquare, Send } from 'lucide-react';
import { API_URL } from '../config';
import { toast } from 'react-toastify';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [likes, setLikes] = useState(0);

    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { token } : {};

                const res = await fetch(`${API_URL}/api/blogs/${id}`, { headers });
                if (!res.ok) {
                    navigate('/blog');
                    return;
                }
                const data = await res.json();
                setBlog(data);
                setLikes(data.likes || 0);
                setIsUpvoted(data.is_upvoted || false);
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                navigate('/blog');
            } finally {
                setLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await fetch(`${API_URL}/api/blogs/${id}/comments`);
                const data = await res.json();
                setComments(data);
            } catch (err) {
                console.error("Failed to fetch comments:", err);
            }
        };

        fetchBlog();
        fetchComments();
    }, [id, navigate]);

    const handleUpvote = async () => {
        if (!isAuthenticated) {
            toast.info("Please login to upvote");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}/upvote`, {
                method: 'POST',
                headers: { token: localStorage.getItem('token') }
            });
            const data = await res.json();
            setLikes(data.likes);
            setIsUpvoted(data.isUpvoted);
        } catch (err) {
            console.error("Failed to upvote:", err);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        if (!isAuthenticated) {
            toast.info("Please login to comment");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token')
                },
                body: JSON.stringify({ content: newComment })
            });
            const data = await res.json();
            setComments([data, ...comments]);
            setNewComment('');
            toast.success("Comment added!");
        } catch (err) {
            console.error("Failed to add comment:", err);
            toast.error("Failed to add comment");
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!blog) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Link>
                </div>
            </div>

            {/* 3-Column Layout: Left Ad | Content | Right Ad */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Sidebar - Ads (Edge) */}
                    <aside className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Sponsored</div>
                                <div className="min-h-[400px]">
                                    <ins className="adsbygoogle"
                                        style={{ display: 'block' }}
                                        data-ad-client="ca-pub-6770525539785120"
                                        data-ad-slot="auto"
                                        data-ad-format="vertical"
                                        data-full-width-responsive="true"></ins>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Ad</div>
                                <div className="min-h-[300px]">
                                    <ins className="adsbygoogle"
                                        style={{ display: 'block' }}
                                        data-ad-client="ca-pub-6770525539785120"
                                        data-ad-slot="auto"
                                        data-ad-format="vertical"
                                        data-full-width-responsive="true"></ins>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content - Center */}
                    <main className="lg:col-span-8">
                        {/* Blog Article */}
                        <article className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 mb-6">
                            {/* Title */}
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
                                {blog.title}
                            </h1>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                                <Link
                                    to={`/profile/${blog.author_name}`}
                                    className="flex items-center gap-1.5 hover:text-blue-600 transition font-medium"
                                >
                                    <User className="h-4 w-4" />
                                    {blog.author_name}
                                </Link>
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    {formatDate(blog.created_at)}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Eye className="h-4 w-4" />
                                    {blog.views || 0} views
                                </span>
                            </div>

                            {/* Content */}
                            <div
                                className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600 prose-img:rounded-xl"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />

                            {/* Actions */}
                            <div className="mt-10 pt-6 border-t border-gray-100 flex items-center gap-4">
                                <button
                                    onClick={handleUpvote}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${isUpvoted
                                        ? 'bg-blue-100 text-blue-600'
                                        : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                                        }`}
                                >
                                    <ThumbsUp className={`h-5 w-5 ${isUpvoted ? 'fill-current' : ''}`} />
                                    {likes} Upvotes
                                </button>
                                <span className="flex items-center gap-2 text-gray-500">
                                    <MessageSquare className="h-5 w-5" />
                                    {comments.length} Comments
                                </span>
                            </div>
                        </article>

                        {/* Comments Section */}
                        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Comments</h2>

                            {/* Comment Form */}
                            <form onSubmit={handleCommentSubmit} className="mb-8">
                                <div className="flex gap-3">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder={isAuthenticated ? "Write a comment..." : "Login to comment"}
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                                        disabled={!isAuthenticated}
                                    />
                                    <button
                                        type="submit"
                                        disabled={!isAuthenticated || !newComment.trim()}
                                        className="px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </form>

                            {/* Comments List */}
                            {comments.length === 0 ? (
                                <div className="text-center py-8 text-gray-400">
                                    No comments yet. Be the first to share your thoughts!
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {comments.map(comment => (
                                        <div key={comment.comment_id} className="flex gap-4">
                                            <div className="flex-shrink-0">
                                                {comment.profile_picture ? (
                                                    <img
                                                        src={comment.profile_picture}
                                                        alt={comment.author_name}
                                                        className="h-10 w-10 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                                        {comment.author_name?.charAt(0).toUpperCase()}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Link
                                                        to={`/profile/${comment.author_name}`}
                                                        className="font-semibold text-gray-900 hover:text-blue-600 transition"
                                                    >
                                                        {comment.author_name}
                                                    </Link>
                                                    <span className="text-xs text-gray-400">
                                                        {formatDate(comment.created_at)}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600">{comment.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </main>

                    {/* Right Sidebar - Ads (Edge) */}
                    <aside className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Advertisement</div>
                                <div className="min-h-[400px]">
                                    <ins className="adsbygoogle"
                                        style={{ display: 'block' }}
                                        data-ad-client="ca-pub-6770525539785120"
                                        data-ad-slot="auto"
                                        data-ad-format="vertical"
                                        data-full-width-responsive="true"></ins>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                                <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Sponsored</div>
                                <div className="min-h-[300px]">
                                    <ins className="adsbygoogle"
                                        style={{ display: 'block' }}
                                        data-ad-client="ca-pub-6770525539785120"
                                        data-ad-slot="auto"
                                        data-ad-format="vertical"
                                        data-full-width-responsive="true"></ins>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
