import React, { useState, useEffect } from 'react';
import { X, Plus, Trash, Youtube, Upload, FolderPlus, Folder, ChevronDown, ChevronRight, FileText } from 'lucide-react';
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
        modules: [
            // { title: "Introduction", videos: [] }
        ]
    });

    // State for temporary inputs
    const [newModuleTitle, setNewModuleTitle] = useState("");
    const [activeModuleIndex, setActiveModuleIndex] = useState(0); // Which module is open
    const [videoInput, setVideoInput] = useState({
        title: "",
        video_url: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            // Transform flat videos if necessary, or use nested modules if backend returns them
            let loadedModules = initialData.modules || [];

            // Backward compatibility: If no modules but videos exist, put them in a "General" module
            if (loadedModules.length === 0 && initialData.videos && initialData.videos.length > 0) {
                loadedModules = [{ title: "General", videos: initialData.videos }];
            }

            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                thumbnail_url: initialData.thumbnail_url || "",
                instructor: initialData.instructor || "",
                category: initialData.category || "Placement",
                price: initialData.price || 0,
                modules: loadedModules
            });
            if (loadedModules.length > 0) setActiveModuleIndex(0);
        } else {
            // Default start with one module
            setFormData(prev => ({ ...prev, modules: [{ title: "Section 1", videos: [] }] }));
        }
    }, [initialData]);

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

    // --- Module Management ---
    const addModule = () => {
        setFormData({
            ...formData,
            modules: [...formData.modules, { title: newModuleTitle || `Section ${formData.modules.length + 1}`, videos: [] }]
        });
        setNewModuleTitle("");
        setActiveModuleIndex(formData.modules.length); // Open new module
    };

    const removeModule = (idx) => {
        if (formData.modules.length <= 1 && idx === 0) {
            toast.warning("Course must have at least one section.");
            return;
        }
        const newModules = [...formData.modules];
        newModules.splice(idx, 1);
        setFormData({ ...formData, modules: newModules });
        if (activeModuleIndex >= newModules.length) setActiveModuleIndex(newModules.length - 1);
    };

    const updateModuleTitle = (idx, title) => {
        const newModules = [...formData.modules];
        newModules[idx].title = title;
        setFormData({ ...formData, modules: newModules });
    };

    // --- Video Management ---
    const addVideoToModule = () => {
        if (!videoInput.title || !videoInput.video_url) {
            toast.error("Video title and URL are required");
            return;
        }

        const newModules = [...formData.modules];
        newModules[activeModuleIndex].videos.push({ ...videoInput });

        setFormData({ ...formData, modules: newModules });
        setVideoInput({ title: "", video_url: "", description: "" });
    };

    const removeVideoFromModule = (mIdx, vIdx) => {
        const newModules = [...formData.modules];
        newModules[mIdx].videos.splice(vIdx, 1);
        setFormData({ ...formData, modules: newModules });
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
                onOrchestrate();
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
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
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
                                rows={2}
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
                                    <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200 h-24 w-auto">
                                        <img src={formData.thumbnail_url} alt="Preview" className="h-full w-auto object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
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
                        </div>

                        {/* Curriculum Manager */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Folder className="h-5 w-5 text-blue-600" /> Curriculum Builder
                            </h3>

                            <div className="flex flex-col lg:flex-row gap-6 h-[500px]">
                                {/* Module List (Sidebar) */}
                                <div className="w-full lg:w-1/3 border border-gray-200 rounded-xl overflow-hidden flex flex-col bg-gray-50">
                                    <div className="p-3 border-b border-gray-200 bg-white">
                                        <div className="flex gap-2">
                                            <input
                                                placeholder="New Section Name"
                                                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                                                value={newModuleTitle}
                                                onChange={e => setNewModuleTitle(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={addModule}
                                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                                        {formData.modules.map((mod, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setActiveModuleIndex(idx)}
                                                className={`p-3 rounded-lg cursor-pointer border transition flex justify-between items-center group ${activeModuleIndex === idx
                                                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                                                        : 'bg-white border-transparent hover:bg-gray-100'
                                                    }`}
                                            >
                                                <div className="overflow-hidden">
                                                    <div className="font-semibold text-gray-800 text-sm truncate">
                                                        {activeModuleIndex === idx ? (
                                                            <input
                                                                value={mod.title}
                                                                onChange={(e) => updateModuleTitle(idx, e.target.value)}
                                                                className="bg-transparent outline-none w-full"
                                                                onClick={(e) => e.stopPropagation()}
                                                            />
                                                        ) : mod.title}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{mod.videos.length} Lessons</div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={(e) => { e.stopPropagation(); removeModule(idx); }}
                                                    className="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Videos in Active Module */}
                                <div className="flex-1 border border-gray-200 rounded-xl overflow-hidden flex flex-col bg-white">
                                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                                        <h4 className="font-bold text-gray-700">
                                            Videos in "{formData.modules[activeModuleIndex]?.title}"
                                        </h4>
                                    </div>

                                    {/* Add Video Form */}
                                    <div className="p-4 border-b border-gray-200 bg-white space-y-3">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <input
                                                placeholder="Lesson Title"
                                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                value={videoInput.title}
                                                onChange={e => setVideoInput({ ...videoInput, title: e.target.value })}
                                            />
                                            <input
                                                placeholder="YouTube URL"
                                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                                                value={videoInput.video_url}
                                                onChange={e => setVideoInput({ ...videoInput, video_url: e.target.value })}
                                            />
                                        </div>
                                        <textarea
                                            placeholder="Theory / Notes (Optional)"
                                            rows={2}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                                            value={videoInput.description}
                                            onChange={e => setVideoInput({ ...videoInput, description: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={addModule} // Typo in original thought, meant addVideoToModule
                                            onClick={addVideoToModule} // Corrected
                                            className="w-full py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 flex items-center justify-center gap-2"
                                        >
                                            <Plus className="h-4 w-4" /> Add Lesson to Section
                                        </button>
                                    </div>

                                    {/* Video List */}
                                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                                        {formData.modules[activeModuleIndex]?.videos.map((vid, idx) => (
                                            <div key={idx} className="flex items-start justify-between p-3 bg-white border border-gray-100 rounded-lg hover:border-blue-200 group">
                                                <div className="flex gap-3 overflow-hidden">
                                                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-bold mt-0.5">
                                                        {idx + 1}
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-gray-900 text-sm truncate">{vid.title}</p>
                                                        <p className="text-xs text-gray-400 truncate">{vid.video_url}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeVideoFromModule(activeModuleIndex, idx)}
                                                    className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition opacity-0 group-hover:opacity-100"
                                                >
                                                    <Trash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {formData.modules[activeModuleIndex]?.videos.length === 0 && (
                                            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-8">
                                                <Youtube className="h-8 w-8 mb-2 opacity-50" />
                                                <p className="text-sm">No videos in this section yet.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
