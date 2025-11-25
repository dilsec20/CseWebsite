const https = require('https');

const urls = [
    'https://csewebsiteplacement-prep-backend.onrender.com/api/public/search?q=dilip_kumar05',
    'https://placement-prep-frontend.onrender.com/profile/dilip_kumar05'
];

urls.forEach(url => {
    console.log(`\nTesting URL: ${url}`);
    https.get(url, (res) => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log('Headers:', res.headers);

        let data = '';
        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log(`Body Length: ${data.length}`);
            console.log(`Body Preview: ${data.substring(0, 200)}`);
        });
    }).on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });
});
