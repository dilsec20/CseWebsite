import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Code } from 'lucide-react';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProblemList from './pages/ProblemList';
import SolveProblem from './pages/SolveProblem';
import KnowledgeBase from './pages/KnowledgeBase';
import Quiz from './pages/Quiz';
import ContestDashboard from './pages/ContestDashboard';
import ContestArena from './pages/ContestArena';
import AptitudeTheory from './pages/AptitudeTheory';
import CSFundamentalsTheory from './pages/CSFundamentalsTheory';
import ReasoningTheory from './pages/ReasoningTheory';
import ProfileMenu from './components/ProfileMenu';
import AdminDashboard from './pages/AdminDashboard';

import DSAPath from './pages/DSAPath';
import DSAModule from './pages/DSAModule';

import { API_URL } from './config';
import AIChatbot from './components/AIChatbot';

// Global Navbar Component
const GlobalNavbar = ({ isAuthenticated, setAuth }) => {
  const location = useLocation();

  // Don't show navbar on landing, login, register pages
  const hideNavbarPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password'];
  if (hideNavbarPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:text-blue-700 transition">
            <Code className="h-6 w-6" />
            <span>PrepPortal</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dsa-path" className="text-gray-700 hover:text-blue-600 font-medium transition">
              DSA Path
            </Link>
            <Link to="/problems" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Problems
            </Link>
            <Link to="/contests" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Contests
            </Link>
            <Link to="/knowledge-base" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Knowledge Base
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.href = `/profile/${e.target.value}`;
                  }
                }}
              />
            </div>
          </div>

          {/* Profile Menu (Right Side) */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <ProfileMenu setAuth={setAuth} />
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const token = localStorage.getItem("token");

      // If no token exists, user is not authenticated
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch(`${API_URL}/auth/is-verify`, {
        method: "GET",
        headers: { token: token }
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
      setIsAuthenticated(false);
    }
  }



  useEffect(() => {
    isAuth();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <GlobalNavbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
      <AIChatbot />
      <Routes>
        <Route path="/" element={<Landing setAuth={setAuth} />} />
        <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
        <Route path="/profile/:username" element={<Profile setAuth={setAuth} />} />
        <Route path="/dsa-path" element={<DSAPath />} />
        <Route path="/dsa/module/:id" element={<DSAModule />} />
        <Route path="/problems" element={<ProblemList setAuth={setAuth} />} />
        <Route path="/problems/:id" element={<SolveProblem setAuth={setAuth} />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/contests" element={<ContestDashboard />} />
        <Route path="/contests/:id" element={<ContestArena />} />
        <Route path="/theory/aptitude" element={<AptitudeTheory />} />
        <Route path="/theory/cs-fundamentals" element={<CSFundamentalsTheory />} />
        <Route path="/theory/reasoning" element={<ReasoningTheory />} />
        <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;




