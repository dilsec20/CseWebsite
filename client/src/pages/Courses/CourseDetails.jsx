import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { PlayCircle, Lock, CheckCircle, User, Calendar, BookOpen, Clock, ChevronRight, FileText } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

const CourseDetails = ({ setAuth }) => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [videos, setVideos] = useState([]);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [enrollLoading, setEnrollLoading] = useState(false);

    useEffect(() => {
        fetchCourseDetails();
        checkEnrollment();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            // First fetch public course info (or all info if backend allows)
            const token = localStorage.getItem("token");
            const headers = token ? { token: token } : {};

            const response = await fetch(`${API_URL}/api/courses/${id}`, { headers });
            if (response.ok) {
                const data = await response.json();
                setCourse(data);
                if (data.videos) {
                    setVideos(data.videos);
                    if (data.videos.length > 0) setCurrentVideo(data.videos[0]);
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
            const enrolled = data.find(c => c.course_id === id);
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
                fetchCourseDetails(); // Refresh to get videos if they were hidden
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
                                    <p className="text-sm text-gray-500">{videos.length} Lessons</p>
                                </div>
                                <div className="overflow-y-auto flex-1 p-2 space-y-1">
                                    {videos.map((vid, idx) => (
                                        <button
                                            key={vid.video_id}
                                            onClick={() => setCurrentVideo(vid)}
                                            className={`w-full flex items-start p-3 rounded-lg text-left transition ${currentVideo.video_id === vid.video_id
                                                    ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200'
                                                    : 'hover:bg-white hover:shadow-sm border border-transparent'
                                                }`}
                                        >
                                            <div className="mr-3 mt-1 text-gray-400">
                                                {currentVideo.video_id === vid.video_id ? <PlayCircle className="h-5 w-5 text-blue-600" /> : <ChevronRight className="h-5 w-5" />}
                                            </div>
                                            <div>
                                                <p className={`text-sm font-medium ${currentVideo.video_id === vid.video_id ? 'text-blue-700' : 'text-gray-700'}`}>
                                                    {idx + 1}. {vid.title}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1 max-w-[200px] truncate">{vid.description}</p>
                                            </div>
                                        </button>
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
                                            {videos.length} Lessons
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
                                        onClick={handleEnroll}
                                        disabled={enrollLoading}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2"
                                    >
                                        {enrollLoading ? 'Enrolling...' : 'Enroll Now'}
                                        {!enrollLoading && <ChevronRight className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* CONTENT LIST / THEORY */}
                <div className="p-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        {isEnrolled && currentVideo && currentVideo.description && (
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-blue-600" /> Lesson Notes & Theory
                                </h3>
                                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed whitespace-pre-wrap">
                                    {currentVideo.description}
                                </div>
                            </div>
                        )}

                        {!isEnrolled && (
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">About this course</h2>
                                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{course.description}</p>
                            </div>
                        )}

                        {/* If enrolled, video is up top. If not enrolled, show curriculum preview */}
                        {!isEnrolled && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                    <h2 className="text-lg font-bold text-gray-900">Curriculum</h2>
                                    <span className="text-sm text-gray-500">{videos.length} Lessons</span>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {videos.length > 0 ? videos.map((vid, idx) => (
                                        <div key={idx} className={`p-4 flex items-center gap-4 ${!isEnrolled ? 'opacity-70 grayscale' : ''}`}>
                                            <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                                                {isEnrolled ? <PlayCircle className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-gray-900 text-sm">{vid.title}</h4>
                                                <p className="text-xs text-gray-500 line-clamp-1">{vid.description || "Video Lesson"}</p>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-8 text-center text-gray-500">
                                            Content is locked or loading...
                                        </div>
                                    )}
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
