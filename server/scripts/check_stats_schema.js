const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "dilip",
    host: "localhost",
    port: 5432,
    database: "placement_prep"
});

async function run() {
    try {
        console.log("Connecting to LOCALHOST database...");

        // List all tables
        const res = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("Tables found:", res.rows.map(r => r.table_name).join(', '));

        const tablesToCheck = ['submissions', 'contest_participations', 'problems'];

        for (const table of tablesToCheck) {
            // Check if table exists first
            if (res.rows.some(r => r.table_name === table)) {
                const cols = await pool.query(`SELECT * FROM ${table} LIMIT 1`);
                console.log(`\nTable: ${table}`);
                console.log("Columns:", Object.keys(cols.rows[0] || {}));
            } else {
                console.log(`\nTable ${table} NOT FOUND.`);
            }
        }

        pool.end();
    } catch (e) {
        console.error(e);
        pool.end();
        process.exit(1);
    }
}

run();
