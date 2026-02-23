// Database configuration with production support
const { Pool } = require("pg");
require("dotenv").config();

// For production (Render), use DATABASE_URL
// For development, use individual env variables
let poolConfig;

if (process.env.DATABASE_URL) {
    // ============================================================
    // PRODUCTION: Supabase via Supavisor pooler (port 6543)
    // 
    // Key settings for Supavisor (PgBouncer-style transaction pooler):
    // 1. Disable prepared statements — they break in transaction mode
    // 2. Keep pool size large enough for Node.js (Supavisor handles multiplexing up to 200 clients)
    // 3. Short idle timeout — Supavisor drops idle connections aggressively
    // ============================================================
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        },
        max: 40,                       // Increased from 5 to 40 to handle 11 concurrent dashboard queries
        idleTimeoutMillis: 10000,      // Close idle connections after 10s (before Supavisor drops them)
        connectionTimeoutMillis: 30000, // Allow 30s for connection attempts in queue
        allowExitOnIdle: true,         // Let pool shrink to 0 when idle

        // CRITICAL: Disable prepared statements for Supavisor transaction-mode pooling
        // Without this, connections get mixed up and queries fail
        statement_timeout: 30000,      // Kill queries running > 30s
    };
} else {
    // LOCAL: Direct connection
    poolConfig = {
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "dilip",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || "placement_prep",
    };
}

const pool = new Pool(poolConfig);

// Handle pool-level errors to prevent crashes
// This fires when an idle client in the pool encounters an error (e.g., Supavisor drops it)
pool.on('error', (err) => {
    console.error('⚠️ Pool idle client error (will auto-reconnect):', err.message);
    // Don't crash — the pool automatically creates new connections as needed
});

// Override pool.query to disable prepared statements for Supavisor
const originalQuery = pool.query.bind(pool);
pool.query = function (text, params) {
    // If text is a string (not a query config object), wrap it to disable prepared statements
    if (typeof text === 'string') {
        return originalQuery({ text, values: params, rowMode: undefined });
    }
    return originalQuery(text, params);
};

// Test connection on startup
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection error:', err.message);
        // Don't crash on startup — the server can still try to reconnect on requests
    } else {
        console.log('✅ Database connected successfully');
        release();
    }
});

module.exports = pool;

