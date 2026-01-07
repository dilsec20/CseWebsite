import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Code, MessageSquareText } from 'lucide-react';
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
import GlobalContestArena from './pages/GlobalContestArena';
import AptitudeTheory from './pages/AptitudeTheory';
import CSFundamentalsTheory from './pages/CSFundamentalsTheory';
import ReasoningTheory from './pages/ReasoningTheory';
import ProfileMenu from './components/ProfileMenu';
import AdminDashboard from './pages/AdminDashboard';
import AdminContestManager from './pages/AdminContestManager';
import Leaderboard from './pages/Leaderboard';
import StudyPlan from './pages/StudyPlan'; // NEW
import DSAPath from './pages/DSAPath';
import DSAModule from './pages/DSAModule';
import CPPath from './pages/CPPath';
import CPModule from './pages/CPModule';
import CPSheet from './pages/CPSheet';
import MyBlogs from './pages/MyBlogs';
import CourseBrowser from './pages/Courses/CourseBrowser';
import CourseDetails from './pages/Courses/CourseDetails';
import MyCourses from './pages/Courses/MyCourses';

import { API_URL } from './config';
import AIChatbot from './components/AIChatbot';
import { CodeProvider } from './contexts/CodeContext';
import { ChatProvider, useChat } from './contexts/ChatContext';

// Streak Counter Component
const StreakCounter = () => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchStreak = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch(`${API_URL}/gamification/my-streak`, {
          headers: { token: token }
        });
        const data = await res.json();
        if (res.ok) setStreak(data.streak);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStreak();

    // Listen for custom event to update streak immediately after solving
    const handleStreakUpdate = () => fetchStreak();
    window.addEventListener('streakUpdated', handleStreakUpdate);

    return () => window.removeEventListener('streakUpdated', handleStreakUpdate);
  }, []);

  if (streak === 0) return null;

  return (
    <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full border border-orange-100" title="Daily Streak">
      <span className="text-lg animate-pulse">🔥</span>
      <span className="font-bold text-orange-600">{streak}</span>
    </div>
  );
};

const NavbarMessageIcon = () => {
  const { openChat, hasUnreadMessages } = useChat();
  return (
    <button
      onClick={() => openChat()}
      className="p-2 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-full transition relative"
      title="Messages"
    >
      <MessageSquareText className="h-6 w-6" />
      {hasUnreadMessages && (
        <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
      )}
    </button>
  );
};

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
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/dashboard" className="flex items-center gap-2 text-blue-600 font-bold text-xl hover:text-blue-700 transition">
            <Code className="h-6 w-6" />
            <span>Dashboard</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dsa-path" className="text-gray-700 hover:text-blue-600 font-medium transition">
              DSA Path
            </Link>
            <Link to="/cp-path" className="text-gray-700 hover:text-blue-600 font-medium transition">
              CP Path
            </Link>
            <Link to="/cp-sheet" className="text-gray-700 hover:text-blue-600 font-medium transition">
              CP Sheet
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Courses
            </Link>

            <Link to="/problems" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Problems
            </Link>
            <Link to="/contests" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Contests
            </Link>
            <Link to="/leaderboard" className="text-gray-700 hover:text-blue-600 font-medium transition flex items-center gap-1">
              <span className="hidden lg:inline">Ranks</span>
              <span className="lg:hidden">Ranks</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-sm mx-6">
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
            {isAuthenticated && (
              <>
                <NavbarMessageIcon />
                <StreakCounter />
              </>
            )}
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

const ChatbotWrapper = () => {
  const location = useLocation();
  // Hide chatbot on all contest related pages
  if (location.pathname.startsWith('/contests')) {
    return null;
  }
  return <AIChatbot />;
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
    <CodeProvider>
      <ChatProvider isAuthenticated={isAuthenticated}>
        <Router>
          <ToastContainer />
          <GlobalNavbar isAuthenticated={isAuthenticated} setAuth={setAuth} />
          <ChatbotWrapper />
          <Routes>
            <Route path="/" element={<Landing setAuth={setAuth} />} />
            <Route path="/register" element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            <Route path="/login" element={!isAuthenticated ? <Login setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/study-plan" element={<StudyPlan />} />
            <Route path="/profile/:username" element={<Profile setAuth={setAuth} />} />
            <Route path="/dsa-path" element={<DSAPath />} />
            <Route path="/dsa/module/:id" element={<DSAModule />} />
            <Route path="/cp-path" element={<CPPath />} />
            <Route path="/cp/module/:id" element={<CPModule />} />
            <Route path="/cp-sheet" element={<CPSheet isAuthenticated={isAuthenticated} />} />
            <Route path="/problems" element={<ProblemList setAuth={setAuth} />} />
            <Route path="/problems/:id" element={<SolveProblem setAuth={setAuth} />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route path="/my-blogs" element={isAuthenticated ? <MyBlogs setAuth={setAuth} /> : <Navigate to="/login" />} />

            {/* Course Routes */}
            <Route path="/courses" element={isAuthenticated ? <CourseBrowser setAuth={setAuth} /> : <Navigate to="/login" />} />
            <Route path="/courses/:id" element={isAuthenticated ? <CourseDetails setAuth={setAuth} /> : <Navigate to="/login" />} />
            <Route path="/my-courses" element={isAuthenticated ? <MyCourses setAuth={setAuth} /> : <Navigate to="/login" />} />

            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/contests" element={<ContestDashboard />} />
            <Route path="/contests/:id" element={<ContestArena />} />
            <Route path="/contests/global/:id" element={isAuthenticated ? <GlobalContestArena /> : <Navigate to="/login" />} />
            <Route path="/theory/aptitude" element={<AptitudeTheory />} />
            <Route path="/theory/cs-fundamentals" element={<CSFundamentalsTheory />} />
            <Route path="/theory/reasoning" element={<ReasoningTheory />} />
            <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />
            <Route path="/admin/contests" element={isAuthenticated ? <AdminContestManager /> : <Navigate to="/login" />} />
          </Routes>

        </Router>
      </ChatProvider>
    </CodeProvider >
  );
}

export default App;
