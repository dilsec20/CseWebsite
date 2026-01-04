import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Search, Filter, Plus, Clock, User, BookOpen, Edit, Trash2, Users } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';
import AddCourseModal from '../../components/Admin/AddCourseModal';

const PLACEHOLDER_IMG_DATA = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='24' fill='%2364748b' text-anchor='middle' dy='.3em'%3ENo Thumbnail%3C/text%3E%3C/svg%3E";

const CourseBrowser = ({ setAuth }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isAdmin, setIsAdmin] = useState(false);

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);

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

    const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);

    useEffect(() => {
        fetchCourses();
        checkAdmin();
        fetchEnrolledCourses();
    }, []);

    const fetchEnrolledCourses = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const response = await fetch(`${API_URL}/api/courses/user/my-courses`, {
                headers: { token: token }
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setEnrolledCourseIds(data.map(c => c.course_id));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const checkAdmin = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return;
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

    const loadFullCourseForEdit = async (id) => {
        try {
            const response = await fetch(`${API_URL}/api/courses/${id}`);
            const data = await response.json();
            setEditingCourse(data);
            setShowModal(true);
        } catch (err) {
            toast.error("Failed to load course data");
        }
    };

    const handleDelete = async (e, id) => {
        e.preventDefault(); // Prevent link nav
        if (!window.confirm("Are you sure you want to delete this course? This cannot be undone.")) return;

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_URL}/api/courses/${id}`, {
                method: 'DELETE',
                headers: { token }
            });

            if (res.ok) {
                toast.success("Course deleted");
                fetchCourses();
            } else {
                toast.error("Delete failed");
            }
        } catch (err) {
            toast.error("Error deleting course");
        }
    };

    const handleEditClick = (e, courseId) => {
        e.preventDefault();
        loadFullCourseForEdit(courseId);
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
                                onClick={() => { setEditingCourse(null); setShowModal(true); }}
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
                                <Link to={`/courses/${course.course_id}`} key={course.course_id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 relative block">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={course.thumbnail_url || "https://img.youtube.com/vi/placeholder/maxresdefault.jpg"}
                                            alt={course.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            onError={(e) => e.target.src = PLACEHOLDER_IMG_DATA}
                                        />
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 z-10">
                                            {course.category}
                                        </div>

                                        {/* Admin Overlay Actions */}
                                        {isAdmin && (
                                            <div className="absolute top-3 right-3 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition duration-200">
                                                <button
                                                    onClick={(e) => handleEditClick(e, course.course_id)}
                                                    className="p-2 bg-white text-gray-700 hover:text-blue-600 rounded-lg shadow-sm hover:shadow-md transition"
                                                    title="Edit Course"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => handleDelete(e, course.course_id)}
                                                    className="p-2 bg-white text-gray-700 hover:text-red-600 rounded-lg shadow-sm hover:shadow-md transition"
                                                    title="Delete Course"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition mb-2 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>

                                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <User className="h-4 w-4" />
                                                <span className="truncate max-w-[100px]">{course.instructor}</span>
                                            </div>

                                            {/* Enrollment Count */}
                                            <div className="flex items-center gap-1 text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                                                <Users className="h-3 w-3" />
                                                <span>{course.enrolled_count || 0}</span>
                                            </div>

                                            {enrolledCourseIds.includes(course.course_id) ? (
                                                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">Enrolled</span>
                                            ) : (
                                                course.price > 0 ? (
                                                    <span className="font-bold text-gray-900">₹{course.price}</span>
                                                ) : (
                                                    <span className="font-bold text-green-600">Free</span>
                                                )
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

            {showModal && (
                <AddCourseModal
                    onClose={() => setShowModal(false)}
                    onOrchestrate={fetchCourses}
                    initialData={editingCourse}
                />
            )}
        </div>
    );
};

export default CourseBrowser;
