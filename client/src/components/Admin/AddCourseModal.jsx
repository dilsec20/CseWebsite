import React, { useState, useEffect } from 'react';
import { X, Plus, Trash, Youtube, Upload, Image as ImageIcon } from 'lucide-react';
import { API_URL } from '../../config';
import { toast } from 'react-toastify';

const AddCourseModal = ({ onClose, onOrchestrate, initialData = null }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail_url: "",
        instructor: "",
        category: "Placement",
        price: 0,
        videos: [] // { title, video_url, description }
    });

    // Video input state
    const [videoInput, setVideoInput] = useState({
        title: "",
        video_url: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                thumbnail_url: initialData.thumbnail_url || "",
                instructor: initialData.instructor || "",
                category: initialData.category || "Placement",
                price: initialData.price || 0,
                videos: initialData.videos || []
            });
        }
    }, [initialData]);

    // Handle Local Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('image', file);

        setUploading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_URL}/api/courses/upload`, {
                method: 'POST',
                headers: { token },
                body: uploadData
            });

            if (response.ok) {
                const data = await response.json();
                // Construct full URL if needed, or stick to relative path handled by backend
                // Assuming backend returns relative path like '/uploads/file.png'
                // We need to prepend API_URL if served from same domain or handle it.
                // For simplicity, let's prepend API_URL if it's relative
                const fullUrl = `${API_URL}${data.imageUrl}`;
                setFormData(prev => ({ ...prev, thumbnail_url: fullUrl }));
                toast.success("Image uploaded!");
            } else {
                toast.error("Upload failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Upload error");
        }
        setUploading(false);
    };

    const handleAddVideo = () => {
        if (!videoInput.title || !videoInput.video_url) {
            toast.error("Video title and URL are required");
            return;
        }
        setFormData({
            ...formData,
            videos: [...formData.videos, { ...videoInput }]
        });
        setVideoInput({ title: "", video_url: "", description: "" });
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
            const token = localStorage.getItem("token");
            const url = initialData
                ? `${API_URL}/api/courses/${initialData.course_id}`
                : `${API_URL}/api/courses`;

            const method = initialData ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success(initialData ? "Course updated!" : "Course created!");
                onOrchestrate(); // Refresh list
                onClose();
            } else {
                const err = await response.json();
                toast.error(err || "Operation failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Network error");
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {initialData ? 'Edit Course' : 'Create New Course'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
                        <X className="h-5 w-5 text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto p-6 flex-1">
                    <form id="course-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
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

                        {/* Thumbnail Upload */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="thumbnail-upload"
                                        />
                                        <label
                                            htmlFor="thumbnail-upload"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg cursor-pointer transition font-medium text-sm"
                                        >
                                            {uploading ? 'Uploading...' : <><Upload className="h-4 w-4" /> Upload Image</>}
                                        </label>
                                    </div>
                                    <span className="text-gray-400 text-sm">OR</span>
                                    <input
                                        type="url"
                                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Paste URL..."
                                        value={formData.thumbnail_url}
                                        onChange={e => setFormData({ ...formData, thumbnail_url: e.target.value })}
                                    />
                                </div>
                                {formData.thumbnail_url && (
                                    <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        <img src={formData.thumbnail_url} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
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
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Video Manager */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Youtube className="h-5 w-5 text-red-600" /> Curriculum Manager
                            </h3>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                                    <input
                                        placeholder="Lesson Title"
                                        className="md:col-span-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        value={videoInput.title}
                                        onChange={e => setVideoInput({ ...videoInput, title: e.target.value })}
                                    />
                                    <input
                                        placeholder="YouTube Link"
                                        className="md:col-span-2 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                        value={videoInput.video_url}
                                        onChange={e => setVideoInput({ ...videoInput, video_url: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <textarea
                                        placeholder="Theory / Notes for this lesson (Optional)"
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                                        value={videoInput.description}
                                        onChange={e => setVideoInput({ ...videoInput, description: e.target.value })}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={handleAddVideo}
                                    className="w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 text-gray-700"
                                >
                                    Add Lesson
                                </button>
                            </div>

                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                                {formData.videos.map((vid, idx) => (
                                    <div key={idx} className="flex items-start justify-between p-3 bg-white border border-gray-100 rounded-lg group hover:border-blue-200 transition">
                                        <div className="flex gap-3 overflow-hidden">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5">
                                                {idx + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="font-medium text-gray-900 text-sm truncate">{vid.title}</p>
                                                <p className="text-xs text-gray-500 truncate">{vid.video_url}</p>
                                                {vid.description && (
                                                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">{vid.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveVideo(idx)}
                                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                                {formData.videos.length === 0 && (
                                    <p className="text-center text-gray-400 text-sm py-4">No lessons added yet.</p>
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
                        form="course-form"
                        disabled={loading}
                        className="px-5 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
                    >
                        {loading ? 'Saving...' : (initialData ? 'Update Course' : 'Create Course')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCourseModal;
