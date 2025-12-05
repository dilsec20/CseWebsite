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
                const response = await fetch(`${API_URL}/api/dashboard/`, {
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
                    { profileData.stats?.total_submissions || 0 }
                            </div >
    <div className="text-sm text-gray-600">Total Submissions</div>
                        </div >
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

                    </div >
                </div >

    {/* Contest Performance */ }
    < div className = "bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-6" >
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

{/* Badge Reference Table - Show when unrated */ }
{
    (profileData.stats?.contest_rating || 0) < 300 && (
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
    )
}
                </div >

    {/* Rating Progression Graph */ }
{/* Rating Progression Graph */ }
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

{/* Contribution Graph */ }
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
