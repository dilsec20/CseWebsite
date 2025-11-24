const axios = require('axios');

async function testLogin() {
    try {
        console.log('Testing login...');
        const response = await axios.post('http://localhost:5000/auth/login', {
            user_email: 'test@example.com',
            user_password: 'password123'
        });

        console.log('Login successful!');
        console.log('Token:', response.data.token);
        console.log('User:', response.data.user_name);

        // Try dashboard
        console.log('\nTrying dashboard...');
        const dashboard = await axios.get('http://localhost:5000/dashboard/', {
            headers: { token: response.data.token }
        });

        console.log('Dashboard loaded!');
        console.log('Stats:', dashboard.data.stats);

    } catch (err) {
        console.error('Error:', err.response?.data || err.message);
        console.error('Status:', err.response?.status);
    }
}

testLogin();
