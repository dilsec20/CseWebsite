const https = require('https');

const username = 'neha_kumari';
const baseUrl = 'csewebsiteplacement-prep-backend.onrender.com';
const url = `https://${baseUrl}/api/public/profile/${username}`;

console.log(`Checking user profile for: ${username}`);
console.log(`URL: ${url}`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response Status:', res.statusCode);
        try {
            const json = JSON.parse(data);
            console.log('Response Body:', JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('Response Body (Raw):', data);
        }
    });

}).on('error', (err) => {
    console.error('Error:', err.message);
});
