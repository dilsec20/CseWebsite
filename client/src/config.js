// API Configuration
// In production, VITE_API_URL will be set in environment variables
// In development, it falls back to localhost:5000

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
