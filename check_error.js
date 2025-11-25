const https = require('https');

const url = "https://csewebsiteplacement-prep-backend.onrender.com/api/admin/seed-prod?secret=dilip_admin";

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Status:', res.statusCode);
        console.log('Body:', data);
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
