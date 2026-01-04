import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Search, Filter, Plus, Clock, User, BookOpen } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';
import AddCourseModal from '../../components/Admin/AddCourseModal';

const CourseBrowser = ({ setAuth }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isAdmin, setIsAdmin] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchCourses();
        checkAdmin();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await fetch(`${API_URL}/api/courses`);
            const data = await response.json();
            setCourses(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const checkAdmin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            // Check role via dashboard or dedicated endpoint. 
            // Since we don't have a dedicated "me" endpoint with role in standard setup, 
            // we'll try to fetch stats which is admin only, or rely on profile.
            // A better way is to decode token if it has role, or just use dashboard API.
            // Let's use the dashboard API which returns user details.

            const response = await fetch(`${API_URL}/api/dashboard`, {
                headers: { token: token }
            });
            const parseRes = await response.json();
            // Assuming the backend dashboard endpoint returns role, or we can add it. 
            // Currently dashboard.js returns user_name. I'll stick to a simple strategy:
            // If the user can see the "Add Course" button, good.
            // Let's checking if the user is admin by hitting the admin stats endpoint casually (if it fails 403, not admin).

            const adminCheck = await fetch(`${API_URL}/api/admin/stats`, {
                headers: { token: token }
            });
            if (adminCheck.status === 200) {
                setIsAdmin(true);
            }
        } catch (err) {
            // Not admin
        }
    };

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const categories = ["All", "Placement", "Full Stack", "DSA", "System Design", "Core CS"];

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
                    {/* Header */}
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Explore Courses</h1>
                            <p className="text-gray-500 mt-1">Master new skills with our curated learning paths.</p>
                        </div>
                        {isAdmin && (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                            >
                                <Plus className="h-5 w-5" /> Add Course
                            </button>
                        )}
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedCategory === cat
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-sm"
                            />
                        </div>
                    </div>

                    {/* Course Grid */}
                    {loading ? (
                        <div className="text-center py-12">Loading courses...</div>
                    ) : filteredCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCourses.map(course => (
                                <Link to={`/courses/${course.course_id}`} key={course.course_id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={course.thumbnail_url || "https://img.youtube.com/vi/placeholder/maxresdefault.jpg"}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            onError={(e) => e.target.src = "https://via.placeholder.com/640x360?text=No+Thumbnail"}
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800">
                                            {course.category}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition mb-2 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <User className="h-4 w-4" />
                                                <span className="truncate max-w-[120px]">{course.instructor}</span>
                                            </div>
                                            {course.price > 0 ? (
                                                <span className="font-bold text-gray-900">₹{course.price}</span>
                                            ) : (
                                                <span className="font-bold text-green-600">Free</span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900">No courses found</h3>
                            <p className="text-gray-500">Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>
            </main>

            {showAddModal && (
                <AddCourseModal onClose={() => setShowAddModal(false)} onOrchestrate={fetchCourses} />
            )}
        </div>
    );
};

export default CourseBrowser;
