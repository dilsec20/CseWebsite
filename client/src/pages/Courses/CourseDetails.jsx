import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { PlayCircle, Lock, CheckCircle, User, Calendar, BookOpen, Clock, ChevronRight, FileText, ChevronDown, Folder } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

const CourseDetails = ({ setAuth }) => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [enrollLoading, setEnrollLoading] = useState(false);

    // Accordion State
    const [expandedModules, setExpandedModules] = useState({});

    useEffect(() => {
        fetchCourseDetails();
        checkEnrollment();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const token = localStorage.getItem("token");
            const headers = token ? { token: token } : {};

            const response = await fetch(`${API_URL}/api/courses/${id}`, { headers });
            if (response.ok) {
                const data = await response.json();
                setCourse(data);

                // Backend returns nested "modules" array
                if (data.modules) {
                    setModules(data.modules);
                    // Open first module by default
                    if (data.modules.length > 0) {
                        setExpandedModules({ [data.modules[0].module_id]: true });
                        // Set first video of first module as current if not set
                        if (data.modules[0].videos.length > 0) {
                            setCurrentVideo(data.modules[0].videos[0]);
                        }
                    }
                } else if (data.videos) {
                    // Fallback for flat structure
                    const flatModule = { module_id: 1, title: "Course Content", videos: data.videos };
                    setModules([flatModule]);
                    if (data.videos.length > 0) setCurrentVideo(data.videos[0]);
                    setExpandedModules({ 1: true });
                }
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const checkEnrollment = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch(`${API_URL}/api/courses/user/my-courses`, {
                headers: { token: token }
            });
            const data = await response.json();
            const enrolled = data.find(c => String(c.course_id) === String(id));
            if (enrolled) {
                setIsEnrolled(true);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleEnroll = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login to enroll");
            return;
        }

        setEnrollLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/courses/${id}/enroll`, {
                method: "POST",
                headers: { token: token }
            });

            if (res.ok) {
                toast.success("Enrolled successfully!");
                setIsEnrolled(true);
                fetchCourseDetails();
            } else {
                const msg = await res.json();
                toast.error(msg || "Enrollment failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error");
        }
        setEnrollLoading(false);
    };

    const toggleModule = (modId) => {
        setExpandedModules(prev => ({
            ...prev,
            [modId]: !prev[modId]
        }));
    };

    const getYoutubeId = (url) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully");
    };

    if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
    if (!course) return <div className="flex h-screen items-center justify-center">Course not found</div>;

    const totalVideos = modules.reduce((acc, mod) => acc + mod.videos.length, 0);

    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            <Sidebar logout={logout} />

            <main className="flex-1 overflow-y-auto w-full">
                {/* HERO SECTION / PLAYER */}
                <div className="w-full bg-white border-b border-gray-200">
                    {isEnrolled && currentVideo ? (
                        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-2 bg-black aspect-video relative group flex flex-col">
                                <iframe
                                    className="w-full flex-1"
                                    src={`https://www.youtube.com/embed/${getYoutubeId(currentVideo.video_url)}?autoplay=0&rel=0`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="lg:col-span-1 bg-gray-50 border-l border-gray-200 flex flex-col h-[500px] lg:h-auto overflow-hidden">
                                <div className="p-4 border-b border-gray-200 bg-white shadow-sm z-10">
                                    <h3 className="font-bold text-lg text-gray-900">Course Content</h3>
                                    <p className="text-sm text-gray-500">{totalVideos} Lessons • {modules.length} Sections</p>
                                </div>

                                {/* Accordion Playist */}
                                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                                    {modules.map((mod) => (
                                        <div key={mod.module_id} className="bg-white border border-gray-100 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => toggleModule(mod.module_id)}
                                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 text-left transition"
                                            >
                                                <span className="font-bold text-gray-800 text-sm flex items-center gap-2">
                                                    <Folder className="h-4 w-4 text-blue-500" /> {mod.title}
                                                </span>
                                                {expandedModules[mod.module_id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                            </button>

                                            {expandedModules[mod.module_id] && (
                                                <div className="divide-y divide-gray-100">
                                                    {mod.videos.map((vid, vIdx) => (
                                                        <button
                                                            key={vid.video_id}
                                                            onClick={() => setCurrentVideo(vid)}
                                                            className={`w-full flex items-start p-3 text-left transition ${currentVideo.video_id === vid.video_id
                                                                    ? 'bg-blue-50 border-l-4 border-blue-600'
                                                                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                                                                }`}
                                                        >
                                                            <div className="mr-3 mt-1 text-gray-400">
                                                                {currentVideo.video_id === vid.video_id ? <PlayCircle className="h-5 w-5 text-blue-600" /> : <ChevronRight className="h-4 w-4" />}
                                                            </div>
                                                            <div>
                                                                <p className={`text-sm font-medium ${currentVideo.video_id === vid.video_id ? 'text-blue-700' : 'text-gray-700'}`}>
                                                                    {vIdx + 1}. {vid.title}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    ))}
                                                    {mod.videos.length === 0 && (
                                                        <div className="p-4 text-xs text-center text-gray-400">No videos in this section</div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* LANDING HERO */
                        <div className="relative bg-gray-900 text-white overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
                            <img src={course.thumbnail_url} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />

                            <div className="relative z-20 max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-end gap-8">
                                <div className="flex-1">
                                    <span className="inline-block px-3 py-1 bg-blue-600 text-xs font-bold rounded-full mb-4">
                                        {course.category || "Course"}
                                    </span>
                                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">{course.title}</h1>
                                    <p className="text-xl text-gray-300 mb-6 max-w-2xl">{course.description}</p>

                                    <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            {course.instructor}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="h-5 w-5" />
                                            {totalVideos} Lessons
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Updated {new Date(course.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 w-full md:w-80">
                                    <p className="text-gray-200 text-sm mb-1">Price</p>
                                    <div className="text-3xl font-bold text-white mb-6">
                                        {course.price > 0 ? `₹${course.price}` : "Free"}
                                    </div>
                                    <button
                                        onClick={isEnrolled ? () => { } : handleEnroll}
                                        disabled={enrollLoading || isEnrolled}
                                        className={`w-full py-4 font-bold rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${isEnrolled
                                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-900/50 cursor-default'
                                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-900/50'
                                            }`}
                                    >
                                        {enrollLoading ? 'Processing...' : (isEnrolled ? 'Enrolled' : 'Enroll Now')}
                                        {!enrollLoading && !isEnrolled && <ChevronRight className="h-5 w-5" />}
                                        {isEnrolled && <CheckCircle className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CONTENT LIST / THEORY */}
                <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {isEnrolled && currentVideo && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" /> Lesson Notes & Theory
                                </h3>
                                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {currentVideo.description || "No theory for this lesson."}
                                </div>
                            </div>
                        )}

                        {!isEnrolled && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">About this course</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
                            </div>
                        )}

                        {/* Curriculum Preview (Not Enrolled) */}
                        {!isEnrolled && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h2 className="text-lg font-bold text-gray-900">Curriculum</h2>
                                    <span className="text-sm text-gray-500">{totalVideos} Lessons</span>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {modules.map(mod => (
                                        <div key={mod.module_id} className="bg-gray-50/50">
                                            <div className="p-3 bg-gray-100 font-bold text-gray-800 text-sm border-y border-gray-200">
                                                {mod.title}
                                            </div>
                                            <div>
                                                {mod.videos.map((vid, idx) => (
                                                    <div key={vid.video_id} className="p-4 flex items-center gap-4 opacity-70 grayscale">
                                                        <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                            <Lock className="h-4 w-4" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-900 text-sm">{vid.title}</h4>
                                                            <p className="text-xs text-gray-500 line-clamp-1">{vid.description || "Video Lesson"}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Info (Instructor, etc) */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-4">Instructor</h3>
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-6 w-6 text-gray-500" />
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{course.instructor}</p>
                                    <p className="text-xs text-gray-500">Course Author</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CourseDetails;
