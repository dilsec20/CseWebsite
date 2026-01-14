import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Eye, ThumbsUp, Calendar, User, ArrowRight, PenTool } from 'lucide-react';
import { API_URL } from '../config';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
        fetchBlogs();
    }, []);

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
                        <Link
                            to="/my-blogs"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition shadow-lg"
                        >
                            <PenTool className="h-4 w-4" />
                            Write a Blog
                        </Link>
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
                                <Link
                                    to="/my-blogs"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
                                >
                                    <PenTool className="h-4 w-4" />
                                    Write a Blog
                                </Link>
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
        </div>
    );
};

export default Blog;
