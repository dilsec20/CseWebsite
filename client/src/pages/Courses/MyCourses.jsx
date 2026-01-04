import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

const MyCourses = ({ setAuth }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMyCourses();
    }, []);

    const fetchMyCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/courses/user/my-courses`, {
                headers: { token: token }
            });
            const data = await response.json();
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar logout={logout} />

            <main className="flex-1 overflow-y-auto">
                <div className="p-8 max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Learning</h1>
                    <p className="text-gray-500 mb-8">Continue where you left off.</p>

                    {loading ? (
                        <div className="text-center py-12">Loading your courses...</div>
                    ) : courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map(course => (
                                <Link to={`/courses/${course.course_id}`} key={course.course_id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        <img
                                            const PLACEHOLDER_IMG_DATA="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle' dy='.3em'%3ENo Thumbnail%3C/text%3E%3C/svg%3E";

                                        // ... (in return)
                                        src={course.thumbnail_url || PLACEHOLDER_IMG_DATA}
                                        alt={course.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        onError={(e) => e.target.src = PLACEHOLDER_IMG_DATA}
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <PlayCircle className="h-12 w-12 text-white drop-shadow-lg scale-90 group-hover:scale-100 transition duration-300" />
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                                                {course.category || 'General'}
                                            </span>
                                            {/* Optional: Add progress bar here if data available */}
                                        </div>

                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-[length:0%_2px] bg-no-repeat bg-left-bottom group-hover:bg-[length:100%_2px] transition-all duration-500 pb-1">
                                            {course.title}
                                        </h3>

                                        <div className="mt-auto pt-4 flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            <span>Enrolled on {new Date(course.enrolled_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar (Mockup for now as we have progress int) */}
                                    <div className="bg-gray-100 h-1.5 w-full">
                                        <div
                                            className="bg-green-500 h-full"
                                            style={{ width: `${Math.min(course.progress || 0, 100)}%` }}
                                        ></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
                            <BookOpen className="h-16 w-16 text-blue-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">You haven't enrolled in any courses yet.</h3>
                            <p className="text-gray-500 mb-6 max-w-md mx-auto">Browse our catalog to find the perfect course to upgrade your skills.</p>
                            <Link
                                to="/courses"
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition"
                            >
                                Browse Courses
                            </Link>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default MyCourses;
