import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserListModal = ({ title, users, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                <div className="max-h-[400px] overflow-y-auto p-2">
                    {users.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">No users found.</p>
                    ) : (
                        users.map(user => (
                            <Link
                                key={user.user_id}
                                to={`/profile/${user.username}`}
                                onClick={onClose}
                                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition"
                            >
                                <img
                                    src={user.profile_picture || `https://ui-avatars.com/api/?name=${user.user_name}`}
                                    alt={user.user_name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-gray-900">{user.user_name}</h4>
                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserListModal;
