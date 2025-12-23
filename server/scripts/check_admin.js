const pool = require('../db');
async function check() {
    try {
        const res = await pool.query("SELECT username, user_email, role FROM users WHERE user_email = 'dilipkumar2832005@gmail.com'");
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (e) { console.error(e); } finally { pool.end(); }
}
check();
