const https = require('https');

const query = 'neha';
const baseUrl = 'csewebsiteplacement-prep-backend.onrender.com';
const url = `https://${baseUrl}/api/public/search?q=${query}`;

console.log(`Searching for: ${query}`);
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
