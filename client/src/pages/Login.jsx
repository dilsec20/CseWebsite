import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, ArrowRight, Code } from 'lucide-react';
import { API_URL } from '../config';

const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { email, password };
            const response = await fetch(
                `${API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Login Successfully");
            } else {
                setAuth(false);
                toast.error(parseRes.error || parseRes);
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12">
                <div className="mb-8">
                    <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-12">
                        <Code className="h-6 w-6" /> Home
                    </Link>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-500">Please enter your details to sign in.</p>
                </div>

                <form onSubmit={onSubmitForm} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username or Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="username or email@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end mb-6">
                        <Link to="/forgot-password" class="text-sm font-medium text-blue-600 hover:text-blue-500">
                            Forgot your password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5"
                    >
                        Sign in <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Sign up for free
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image/Gradient */}
            <div className="hidden lg:block w-1/2 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-900 opacity-90"></div>
                <div className="absolute inset-0 flex items-center justify-center p-12 text-white z-10">
                    <div>
                        <h2 className="text-4xl font-bold mb-6">Code your way to success.</h2>
                        <p className="text-lg text-blue-100 max-w-md">Join thousands of students mastering Data Structures and Algorithms with our curated path.</p>

                        <div className="mt-12 grid grid-cols-2 gap-6">
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <h3 className="font-bold text-2xl mb-1">500+</h3>
                                <p className="text-sm text-blue-200">Problems Solved</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                                <h3 className="font-bold text-2xl mb-1">50+</h3>
                                <p className="text-sm text-blue-200">Contests Hosted</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
            </div>
        </div>
    );
};

export default Login;
