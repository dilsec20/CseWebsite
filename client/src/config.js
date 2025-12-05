// API Configuration
// Dynamically determine API URL based on environment
export const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? "http://localhost:5000"
    : "https://csewebsiteplacement-prep-backend.onrender.com";
