import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal, BookOpen, Trophy, ArrowRight, CheckCircle, Cpu } from 'lucide-react';
import ProfileMenu from '../components/ProfileMenu';

const Landing = ({ setAuth }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsAuthenticated(!!token);
        };
        checkAuth();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 hero-gradient overflow-hidden">
            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 p-2 rounded-lg">
                        <Code className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">AceCoder</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/visalgo" className="text-gray-600 hover:text-blue-600 font-medium transition">VisAlgo</Link>
                    <Link to="/blog" className="text-gray-600 hover:text-blue-600 font-medium transition">Blog</Link>
                    <Link to="/dsa-path" className="text-gray-600 hover:text-blue-600 font-medium transition">DSA Path</Link>
                    <Link to="/cp-path" className="text-gray-600 hover:text-blue-600 font-medium transition">CP Path</Link>
                    <Link to="/cp-sheet" className="text-gray-600 hover:text-blue-600 font-medium transition">CP Sheet</Link>

                    {isAuthenticated ? (
                        <ProfileMenu setAuth={setAuth} />
                    ) : (
                        <>
                            <Link to="/login" className="text-gray-900 font-medium hover:text-blue-600 transition">Sign In</Link>
                            <Link
                                to="/register"
                                className="px-5 py-2.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
                            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                            New: Contest Arena Live
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                            AceCoder<br />
                            <span className="gradient-text">DSA & Competitive Programming</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
                            AceCoder is an online platform for programmers to practice Data Structures and Algorithms, competitive programming, interview questions, and problem solving.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/register"
                                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-blue-500/30 flex items-center justify-center"
                            >
                                Start Practicing <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                to="/problems"
                                className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition flex items-center justify-center"
                            >
                                View Problems
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 text-gray-500">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>500+ Problems</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span>Real Compilers</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-2xl animate-pulse"></div>
                        <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 p-2 overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <div className="text-gray-500 text-xs font-mono ml-2">main.cpp</div>
                            </div>
                            <div className="p-6 font-mono text-sm text-gray-300 leading-relaxed">
                                <p><span className="text-purple-400">#include</span> <span className="text-green-400">&lt;iostream&gt;</span></p>
                                <p><span className="text-purple-400">using</span> <span className="text-blue-400">namespace</span> std;</p>
                                <br />
                                <p><span className="text-blue-400">int</span> <span className="text-yellow-400">main</span>() {'{'}</p>
                                <p className="pl-4"><span className="text-gray-500">// Your journey starts here</span></p>
                                <p className="pl-4">cout &lt;&lt; <span className="text-green-400">"Hello, Dream Job!"</span> &lt;&lt; endl;</p>
                                <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-orange-400">0</span>;</p>
                                <p>{'}'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything you need to succeed</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Designed by engineers, for engineers. We cover every aspect of your placement preparation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Terminal className="h-8 w-8 text-blue-600" />,
                                title: "Interactive Coding",
                                desc: "Write, run, and debug code in C++ with our powerful Monaco-based editor and real-time execution engine.",
                                link: "/problems"
                            },
                            {
                                icon: <BookOpen className="h-8 w-8 text-purple-600" />,
                                title: "Knowledge Base",
                                desc: "Master CS fundamentals including OS, DBMS, and CN with our comprehensive quiz system.",
                                link: "/knowledge-base"
                            },
                            {
                                icon: <Trophy className="h-8 w-8 text-yellow-600" />,
                                title: "Contest Arena",
                                desc: "Simulate real interviews with timed contests. 5 problems, 2 hours, infinite pressure.",
                                link: "/contests"
                            }
                        ].map((feature, idx) => (
                            <Link
                                key={idx}
                                to={feature.link}
                                className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:border-blue-200 transition duration-300 block group"
                            >
                                <div className="bg-white w-14 h-14 rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center md:text-left">
                        {/* About Us */}
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center space-x-2 text-white mb-6">
                                <Code className="h-6 w-6" />
                                <span className="text-xl font-bold tracking-tight">AceCoder</span>
                            </div>
                            <p className="leading-relaxed mb-6">
                                AceCoder is a comprehensive coding platform designed for students and professionals. We provide a robust environment for practicing Data Structures, Algorithms, and Competitive Programming to help you crack your dream tech reviews.
                            </p>
                            <p className="text-sm">
                                &copy; {new Date().getFullYear()} AceCoder. All rights reserved.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div className="flex flex-col items-center md:items-start">
                            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1">
                                        <Cpu className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">Dilip Kumar</p>
                                        <p className="text-sm">CSE Student</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <a href="mailto:kumardileep0555@gmail.com" className="hover:text-blue-400 transition">
                                        kumardileep0555@gmail.com
                                    </a>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </div>
                                    <a href="https://x.com/dilsec18" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
                                        @dilsec18
                                    </a>
                                </div>

                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0 mt-1">
                                        <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p>Motihari, Bihar</p>
                                        <p className="text-sm">Pin Code: 845401</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
