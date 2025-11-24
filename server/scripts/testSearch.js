const http = require('http');

http.get('http://localhost:5000/api/public/search?q=a', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        const users = JSON.parse(data);
        if (users.length > 0) {
            console.log("Found user:", users[0].user_name);
        } else {
            console.log("No users found");
        }
    });
});
