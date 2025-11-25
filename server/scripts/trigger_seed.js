const https = require('https');

const url = 'https://csewebsiteplacement-prep-backend.onrender.com/api/admin/seed-prod?secret=dilip_admin';

console.log(`Triggering seed at: ${url}`);

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
