import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { toast } from 'react-toastify';
import { API_URL } from '../config';

const ProfileMenu = ({ setAuth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [userData, setUserData] = useState(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/dashboard/`, {
                    headers: { token: localStorage.getItem("token") }
                });
                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        getUserData();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
        navigate("/");
    };

    // Generate initials from username
    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Generate color from username (consistent hash)
    const getAvatarColor = (str) => {
        if (!str) return '#3B82F6'; // default blue
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colors = [
            '#3B82F6', // blue
            '#8B5CF6', // purple
            '#EC4899', // pink
            '#10B981', // green
            '#F59E0B', // amber
            '#EF4444', // red
        ];
        return colors[Math.abs(hash) % colors.length];
    };

    if (!userData) return null;

    const avatarColor = getAvatarColor(userData.username);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 hover:opacity-80 transition"
            >
                {userData.profile_picture ? (
                    <img
                        src={userData.profile_picture}
                        alt={userData.user_name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                    />
                ) : (
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-gray-200"
                        style={{ backgroundColor: avatarColor }}
                    >
                        {getInitials(userData.user_name)}
                    </div>
                )}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">{userData.user_name}</p>
                        <p className="text-xs text-gray-500">@{userData.username}</p>
                    </div>

                    {/* Menu Items */}
                    <Link
                        to={`/profile/${userData.user_name}`}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        <User className="h-4 w-4 mr-3" />
                        View Profile
                    </Link>

                    <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition"
                        onClick={() => setIsOpen(false)}
                    >
                        <LayoutDashboard className="h-4 w-4 mr-3" />
                        Dashboard
                    </Link>

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
