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
                    <span className="text-2xl font-bold text-gray-900 tracking-tight">PrepPortal</span>
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition">Features</a>
                    <Link to="/dsa-path" className="text-gray-600 hover:text-blue-600 font-medium transition">DSA Path</Link>
                    <Link to="/cp-path" className="text-gray-600 hover:text-blue-600 font-medium transition">CP Path</Link>

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
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                            Master Your <br />
                            <span className="gradient-text">Placement Prep</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                            The all-in-one platform to crack your dream job. Practice DSA, master CS fundamentals, and compete in live coding contests.
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
        </div>
    );
};

export default Landing;
