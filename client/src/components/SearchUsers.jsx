import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const SearchUsers = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const searchUsers = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/api/public/search?q=${encodeURIComponent(query)}`);
                const data = await response.json();
                setResults(data);
                setIsOpen(true);
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            if (query) searchUsers();
        }, 300); // Debounce

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelectUser = (username) => {
        navigate(`/profile/${username}`);
        setQuery('');
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate(`/profile/${query}`);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative w-full max-w-md" ref={searchRef}>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (!e.target.value) setIsOpen(false);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search users..."
                    className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            setIsOpen(false);
                        }}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && (results.length > 0 || loading) && (
                <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 max-h-60 overflow-auto">
                    {loading ? (
                        <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
                    ) : results.length > 0 ? (
                        results.map((user) => (
                            <button
                                key={user.user_name}
                                onClick={() => handleSelectUser(user.user_name)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 transition"
                            >
                                {user.profile_picture ? (
                                    <img
                                        src={user.profile_picture}
                                        alt={user.user_name}
                                        className="w-8 h-8 rounded-full object-cover border border-gray-200"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                                        {user.user_name.substring(0, 2).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{user.user_name}</p>
                                </div>
                            </button>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-sm text-gray-500">No users found</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchUsers;
