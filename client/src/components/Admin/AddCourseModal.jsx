import React, { useState } from 'react';
import { X, Plus, Trash, Youtube } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

const AddCourseModal = ({ onClose, onOrchestrate }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail_url: "",
        instructor: "",
        category: "Placement",
        videos: [] // { title, video_url, description }
    });

    const [videoInput, setVideoInput] = useState({
        title: "",
        video_url: ""
    });

    const [loading, setLoading] = useState(false);

    const handleAddVideo = () => {
        if (!videoInput.title || !videoInput.video_url) {
            toast.error("Video title and URL are required");
            return;
        }
        setFormData({
            ...formData,
            videos: [...formData.videos, { ...videoInput }]
        });
        setVideoInput({ title: "", video_url: "" });
    };

    const handleRemoveVideo = (idx) => {
        const newVideos = [...formData.videos];
        newVideos.splice(idx, 1);
        setFormData({ ...formData, videos: newVideos });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/courses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success("Course added successfully!");
                onOrchestrate(); // Refresh list
                onClose();
            } else {
                const err = await response.json();
                toast.error(err || "Failed to add course");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Add New Course</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 flex-1">
                    <form id="add-course-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={formData.instructor}
                                    onChange={e => setFormData({ ...formData, instructor: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                                <input
                                    type="url"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="https://..."
                                    value={formData.thumbnail_url}
                                    onChange={e => setFormData({ ...formData, thumbnail_url: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    <option>Placement</option>
                                    <option>Full Stack</option>
                                    <option>DSA</option>
                                    <option>System Design</option>
                                    <option>Core CS</option>
                                </select>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Youtube className="h-5 w-5 text-red-600" /> Course Content (YouTube Videos)
                            </h3>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                    <input
                                        placeholder="Video Title"
                                        className="md:col-span-1 px-3 py-2 border border-gray-200 rounded-lg"
                                        value={videoInput.title}
                                        onChange={e => setVideoInput({ ...videoInput, title: e.target.value })}
                                    />
                                    <input
                                        placeholder="YouTube URL or Video ID"
                                        className="md:col-span-2 px-3 py-2 border border-gray-200 rounded-lg"
                                        value={videoInput.video_url}
                                        onChange={e => setVideoInput({ ...videoInput, video_url: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddVideo}
                                    className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700"
                                >
                                    Add Video to Curriculum
                                </button>
                            </div>

                            <div className="space-y-2">
                                {formData.videos.map((vid, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg">
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                {idx + 1}
                                            </span>
                                            <div className="truncate">
                                                <p className="font-medium text-gray-900 text-sm truncate">{vid.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{vid.video_url}</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveVideo(idx)}
                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                {formData.videos.length === 0 && (
                                    <p className="text-center text-gray-400 text-sm py-2">No videos added yet.</p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-600 font-medium hover:bg-gray-200 rounded-xl transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        form="add-course-form"
                        disabled={loading}
                        className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? 'Creating...' : 'Create Course'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCourseModal;
