const pool = require('./db');

async function checkUserSchema() {
    try {
        const res = await pool.query("SELECT * FROM users LIMIT 1");
        console.log("Users Table Columns:", Object.keys(res.rows[0]));
        
        // Check for submissions table for leaderboard calculation
        try {
            const subRes = await pool.query("SELECT * FROM submissions LIMIT 1");
             if(subRes.rows.length > 0) {
                console.log("Submissions Table Columns:", Object.keys(subRes.rows[0]));
             } else {
                 console.log("Submissions table exists but is empty.");
                 // Get columns from empty result using fields if possible, or just assume standard
                 // Actually empty result doesn't give keys with Object.keys on rows[0]
                 // Using information_schema is better but let's see.
             }
        } catch(e) {
            console.log("Submissions table might not exist or error:", e.message);
        }

    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

checkUserSchema();
