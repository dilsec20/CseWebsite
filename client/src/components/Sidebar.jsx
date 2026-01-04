import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Code,
    BookOpen,
    Trophy,
    LogOut,
    MessageSquare,
    GraduationCap,
    Library
} from 'lucide-react';

const Sidebar = ({ logout }) => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? "bg-blue-50 text-blue-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900";
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
            <div className="p-6 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl">
                    <Code className="h-6 w-6" /> AceCoder
                </Link>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                <Link to="/dashboard" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/dashboard')}`}>
                    <LayoutDashboard className="h-5 w-5" /> Dashboard
                </Link>
                <Link to="/problems" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/problems')}`}>
                    <Code className="h-5 w-5" /> Problems
                </Link>
                <Link to="/courses" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/courses')}`}>
                    <Library className="h-5 w-5" /> Courses
                </Link>
                <Link to="/my-courses" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/my-courses')}`}>
                    <GraduationCap className="h-5 w-5" /> My Courses
                </Link>
                <Link to="/knowledge-base" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/knowledge-base')}`}>
                    <BookOpen className="h-5 w-5" /> Knowledge Base
                </Link>
                <Link to="/contests" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/contests')}`}>
                    <Trophy className="h-5 w-5" /> Contests
                </Link>
                <Link to="/my-blogs" className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${isActive('/my-blogs')}`}>
                    <MessageSquare className="h-5 w-5" /> Your Posts
                </Link>
            </nav>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium w-full transition"
                >
                    <LogOut className="h-5 w-5" /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
