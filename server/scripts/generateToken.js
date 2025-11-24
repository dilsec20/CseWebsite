const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a test token
const payload = {
    user: {
        id: '123e4567-e89b-12d3-a456-426614174000' // fake UUID
    }
};

const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
console.log('Test Token:', token);

// Test if it can be decoded
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log('Decoded:', decoded);
console.log('User ID:', decoded.user.id);
