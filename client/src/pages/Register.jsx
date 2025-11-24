import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Mail, Lock, User, ArrowRight, Code } from 'lucide-react';
import { API_URL } from '../config';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        `${API_URL}/auth/register`,
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
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
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
            <Code className="h-6 w-6" /> PrepPortal
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Create an account</h1>
          <p className="text-gray-500">Start your journey to placement success today.</p>
        </div>

        <form onSubmit={onSubmitForm} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="john@example.com"
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
                placeholder="Create a strong password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition transform hover:-translate-y-0.5"
          >
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Gradient */}
      <div className="hidden lg:block w-1/2 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-900 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12 text-white z-10">
          <div>
            <h2 className="text-4xl font-bold mb-6">Join the community.</h2>
            <p className="text-lg text-blue-100 max-w-md">Connect with peers, compete in contests, and track your progress on the leaderboard.</p>

            <div className="mt-12 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">Practice Daily</h4>
                  <p className="text-sm text-blue-200">Consistent effort leads to success.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold">Mock Interviews</h4>
                  <p className="text-sm text-blue-200">Prepare for the real deal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-96 h-96 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default Register;
