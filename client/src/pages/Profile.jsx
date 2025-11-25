import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { User, Edit3, Save, X, Linkedin, Github, Mail, Calendar, Award, Code, Upload, CheckCircle, TrendingUp, Trophy } from 'lucide-react';
import { toast } from 'react-toastify';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { API_URL } from '../config';

const Profile = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        bio: '',
        linkedinUrl: '',
        githubUrl: ''
    });
    const [previewImage, setPreviewImage] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        getProfileData();
    }, [username]);

    const getProfileData = async () => {
        try {
            const token = localStorage.getItem("token");
            let data;

            // Check if viewing own profile
            if (token) {
                const response = await fetch(`${API_URL}/dashboard/`, {
                    headers: { token: token }
                });
                const myData = await response.json();

                // If no username param or param matches my username, it's my profile
                if (!username || username === myData.user_name) {
                    setIsOwnProfile(true);
                    data = myData;
                } else {
                    setIsOwnProfile(false);
                    // Fetch public profile
                    const publicResponse = await fetch(`${API_URL}/api/public/profile/${username}`);
                    if (publicResponse.status === 404) {
                        toast.error("User not found");
                        navigate("/dashboard");
                        return;
                    }
                    data = await publicResponse.json();
                }
            } else {
                // Not logged in, fetch public profile
                setIsOwnProfile(false);
                const publicResponse = await fetch(`${API_URL}/api/public/profile/${username}`);
                if (publicResponse.status === 404) {
                    toast.error("User not found");
                    navigate("/login");
                    return;
                }
                data = await publicResponse.json();
            }

            setProfileData(data);
            setFormData({
                user_name: data.user_name || '',
                bio: data.bio || '',
                linkedinUrl: data.linkedin_url || '',
                githubUrl: data.github_url || ''
            });
            setPreviewImage(data.profile_picture);
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to load profile");
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size should be less than 2MB");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveProfile = async () => {
        try {
            // Client-side validation
            if (formData.user_name) {
                const usernameRegex = /^[a-zA-Z0-9_]+$/;
                if (!usernameRegex.test(formData.user_name)) {
                    toast.error("Username can only contain letters, numbers, and underscores");
                    return;
                }
            }

            const body = {
                user_name: formData.user_name,
                bio: formData.bio,
                profile_picture: previewImage,
                linkedin_url: formData.linkedinUrl,
                github_url: formData.githubUrl
            };

            const response = await fetch(`${API_URL}/dashboard/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.status === 400) {
                toast.error(data.error);
                return;
            }

            if (data.message) {
                toast.success("Profile updated successfully!");
                setIsEditing(false);
                // If username was changed, navigate to the new profile URL
                if (formData.user_name !== profileData.user_name) {
                    window.location.href = `/profile/${formData.user_name}`;
                } else {
                    getProfileData();
                }
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Failed to update profile");
        }
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (str) => {
        if (!str) return '#3B82F6';
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
        return colors[Math.abs(hash) % colors.length];
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    const getRatingBadge = (rating) => {
        if (rating >= 1000) return { title: 'Master', color: 'text-red-600', bg: 'bg-red-100' };
        if (rating >= 800) return { title: 'Expert', color: 'text-purple-600', bg: 'bg-purple-100' };
        if (rating >= 500) return { title: 'Achiever', color: 'text-blue-600', bg: 'bg-blue-100' };
        if (rating >= 300) return { title: 'Beginner', color: 'text-green-600', bg: 'bg-green-100' };
        return { title: 'Unrated', color: 'text-gray-600', bg: 'bg-gray-100' };
    };

    const getRatingColor = (rating) => {
        if (rating >= 1000) return 'text-red-600';
        if (rating >= 800) return 'text-purple-600';
        if (rating >= 500) return 'text-blue-600';
        if (rating >= 300) return 'text-green-600';
        return 'text-gray-600';
    };

    if (!profileData || !profileData.stats) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const avatarColor = getAvatarColor(profileData.user_name);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/dashboard" className="text-blue-600 hover:text-blue-700 font-medium">
                        ← Back to Dashboard
                    </Link>
                    {!isEditing && isOwnProfile ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                        >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit Profile
                        </button>
                    ) : isEditing && isOwnProfile ? (
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({
                                        user_name: profileData.user_name || '',
                                        bio: profileData.bio || '',
                                        linkedinUrl: profileData.linkedin_url || '',
                                        githubUrl: profileData.github_url || ''
                                    });
                                    setPreviewImage(profileData.profile_picture);
                                }}
                                className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
                            >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveProfile}
                                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Profile Content */}
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Profile Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="relative">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt={profileData.user_name}
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                                />
                            ) : (
                                <div
                                    className="w-32 h-32 rounded-full flex items-center justify-center text-white font-bold text-4xl border-4 border-gray-200"
                                    style={{ backgroundColor: avatarColor }}
                                >
                                    {getInitials(profileData.user_name)}
                                </div>
                            )}

                            {isEditing && (
                                <>
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition shadow-lg"
                                    >
                                        <Upload className="h-5 w-5" />
                                    </button>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </>
                            )}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className={`text-3xl font-bold ${getRatingColor(profileData.stats?.contest_rating || 0)}`}>
                                    {profileData.user_name}
                                </h1>
                                {profileData.stats?.problems_solved > 0 && (
                                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                        <CheckCircle className="h-4 w-4 inline mr-1" />
                                        Active
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 text-lg mb-1">@{profileData.user_name}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                                <div className="flex items-center gap-1">
                                    <Mail className="h-4 w-4" />
                                    {profileData.user_email}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Joined {formatDate(profileData.member_since)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <User className="h-5 w-5" />
                        About Me
                    </h2>
                    {isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                <input
                                    type="text"
                                    value={formData.user_name}
                                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="username"
                                />
                                <p className="text-xs text-gray-500 mt-1">Only letters, numbers, and underscores allowed.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                                <textarea
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tell us about yourself..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                                    rows={4}
                                />
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-700 leading-relaxed">
                            {profileData.bio || "No bio added yet. Click 'Edit Profile' to add one!"}
                        </p>
                    )}
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Social Links</h2>
                    <div className="space-y-4">
                        {/* LinkedIn */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Linkedin className="h-4 w-4 text-blue-600" />
                                LinkedIn
                            </label>
                            {isEditing ? (
                                <input
                                    type="url"
                                    value={formData.linkedinUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                profileData.linkedin_url ? (
                                    <a href={profileData.linkedin_url} target="_blank" rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center gap-2">
                                        {profileData.linkedin_url}
                                    </a>
                                ) : (
                                    <p className="text-gray-500">Not added</p>
                                )
                            )}
                        </div>

                        {/* GitHub */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <Github className="h-4 w-4" />
                                GitHub
                            </label>
                            {isEditing ? (
                                <input
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    placeholder="https://github.com/username"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            ) : (
                                profileData.github_url ? (
                                    <a href={profileData.github_url} target="_blank" rel="noopener noreferrer"
                                        className="text-gray-900 hover:underline flex items-center gap-2">
                                        {profileData.github_url}
                                    </a>
                                ) : (
                                    <p className="text-gray-500">Not added</p>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Statistics */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Statistics
                    </h2>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-1">
                                {profileData.stats?.problems_solved || 0}
                            </div>
                            <div className="text-sm text-gray-600">Problems Solved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-600 mb-1">
                                {profileData.stats?.total_submissions || 0}
                            </div>
                            <div className="text-sm text-gray-600">Total Submissions</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600 mb-1">
                                {profileData.stats?.current_streak || 0}
                            </div>
                            <div className="text-sm text-gray-600">Day Streak</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-1">
                                {profileData.stats?.easy_solved || 0}
                            </div>
                            <div className="text-sm text-gray-600">Easy Solved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-600 mb-1">
                                {profileData.stats?.medium_solved || 0}
                            </div>
                            <div className="text-sm text-gray-600">Medium Solved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-1">
                                {profileData.stats?.hard_solved || 0}
                            </div>
                            <div className="text-sm text-gray-600">Hard Solved</div>
                        </div>

                    </div>
                </div>

                {/* Contest Performance */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Contest Performance
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-orange-600 mb-1">
                                {profileData.stats?.contest_rating || 0}
                            </div>
                            <div className="text-sm text-gray-600">Contest Rating</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-purple-600 mb-1">
                                {profileData.stats?.contests_attended || 0}
                            </div>
                            <div className="text-sm text-gray-600">Contests Attended</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-600 mb-1">
                                {profileData.stats?.contest_solutions || 0}
                            </div>
                            <div className="text-sm text-gray-600">Contest Solutions</div>
                        </div>
                        <div className="text-center">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full ${getRatingBadge(profileData.stats?.contest_rating || 0).bg} mb-2`}>
                                <span className={`text-2xl font-bold ${getRatingBadge(profileData.stats?.contest_rating || 0).color}`}>
                                    {getRatingBadge(profileData.stats?.contest_rating || 0).title}
                                </span>
                            </div>
                            <div className="text-sm text-gray-600">Rating Badge</div>
                        </div>
                    </div>

                    {/* Badge Reference Table - Show when unrated */}
                    {(profileData.stats?.contest_rating || 0) < 300 && (
                        <div className="mt-6 border-t pt-6">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Rating Badge Levels</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-2 px-3 font-medium text-gray-600">Points</th>
                                            <th className="text-left py-2 px-3 font-medium text-gray-600">Badge</th>
                                            <th className="text-left py-2 px-3 font-medium text-gray-600">Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3">1000+</td>
                                            <td className="py-2 px-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 font-semibold text-xs">
                                                    Master
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-red-600 font-medium">Red</td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3">800-999</td>
                                            <td className="py-2 px-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-600 font-semibold text-xs">
                                                    Expert
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-purple-600 font-medium">Purple</td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3">500-799</td>
                                            <td className="py-2 px-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold text-xs">
                                                    Achiever
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-blue-600 font-medium">Blue</td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="py-2 px-3">300-499</td>
                                            <td className="py-2 px-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-600 font-semibold text-xs">
                                                    Beginner
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-green-600 font-medium">Green</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50">
                                            <td className="py-2 px-3">0-299</td>
                                            <td className="py-2 px-3">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-semibold text-xs">
                                                    Unrated
                                                </span>
                                            </td>
                                            <td className="py-2 px-3 text-gray-600 font-medium">Gray</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Rating Progression Graph */}
                {/* Rating Progression Graph */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Rating Progression</h3>
                    </div>
                    {profileData.rating_history && profileData.rating_history.length > 0 ? (
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={profileData.rating_history}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 20,
                                        bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    {/* Colored background zones */}
                                    <ReferenceArea y1={0} y2={300} fill="#f3f4f6" fillOpacity={0.9} />
                                    <ReferenceArea y1={300} y2={500} fill="#dcfce7" fillOpacity={0.9} />
                                    <ReferenceArea y1={500} y2={800} fill="#dbeafe" fillOpacity={0.9} />
                                    <ReferenceArea y1={800} y2={1000} fill="#f3e8ff" fillOpacity={0.9} />
                                    <ReferenceArea y1={1000} y2={10000} fill="#fee2e2" fillOpacity={0.9} />

                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        domain={[0, 1200]}
                                        ticks={[0, 300, 500, 800, 1000]}
                                        tickFormatter={(value) => {
                                            if (value === 1000) return 'Master';
                                            if (value === 800) return 'Expert';
                                            if (value === 500) return 'Achiever';
                                            if (value === 300) return 'Beginner';
                                            if (value === 0) return 'Unrated';
                                            return '';
                                        }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#fff',
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '0.5rem',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                        formatter={(value) => {
                                            const badge = value >= 1000 ? 'Master' :
                                                value >= 800 ? 'Expert' :
                                                    value >= 500 ? 'Achiever' :
                                                        value >= 300 ? 'Beginner' : 'Unrated';
                                            return [`${value} pts (${badge})`, 'Rating'];
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="rating"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={{ r: 4, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                                        activeDot={{ r: 6, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="h-[300px] w-full flex flex-col items-center justify-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <Trophy className="h-12 w-12 mb-3 text-gray-400" />
                            <p className="font-medium">No contest history yet</p>
                            <p className="text-sm mt-1">Participate in contests to see your rating progression!</p>
                        </div>
                    )}
                </div>

                {/* Contribution Graph */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Contribution Graph
                    </h2>
                    <div className="w-full overflow-x-auto">
                        <style>{`
                            .react-calendar-heatmap text {
                                font-size: 10px;
                                fill: #9ca3af;
                            }
                            .react-calendar-heatmap .color-empty { fill: #ebedf0; }
                            .react-calendar-heatmap .color-scale-1 { fill: #dcfce7; }
                            .react-calendar-heatmap .color-scale-2 { fill: #86efac; }
                            .react-calendar-heatmap .color-scale-3 { fill: #4ade80; }
                            .react-calendar-heatmap .color-scale-4 { fill: #22c55e; }
                            .react-calendar-heatmap .color-scale-5 { fill: #16a34a; }
                        `}</style>
                        <CalendarHeatmap
                            startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
                            endDate={new Date()}
                            values={profileData.submission_calendar || []}
                            classForValue={(value) => {
                                if (!value) {
                                    return 'color-empty';
                                }
                                if (value.count >= 10) return 'color-scale-5';
                                if (value.count >= 7) return 'color-scale-4';
                                if (value.count >= 4) return 'color-scale-3';
                                if (value.count >= 2) return 'color-scale-2';
                                return 'color-scale-1';
                            }}
                            tooltipDataAttrs={value => {
                                if (!value || !value.date) {
                                    return null;
                                }
                                return {
                                    'data-tooltip-id': 'heatmap-tooltip',
                                    'data-tooltip-content': `${value.count} submissions on ${value.date}`,
                                };
                            }}
                            showWeekdayLabels={true}
                        />
                        <ReactTooltip id="heatmap-tooltip" />
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Profile;
