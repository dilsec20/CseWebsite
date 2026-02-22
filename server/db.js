// Database configuration with production support
const { Pool } = require("pg");
require("dotenv").config();

// For production (Render), use DATABASE_URL
// For development, use individual env variables
const pool = process.env.DATABASE_URL
    ? new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false // Required for Render PostgreSQL
        },
        max: 10,                      // Max connections in pool
        idleTimeoutMillis: 30000,     // Close idle connections after 30s
        connectionTimeoutMillis: 10000 // Timeout connection attempts after 10s
    })
    : new Pool({
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "dilip",
        host: process.env.DB_HOST || "localhost",
        port: process.env.DB_PORT || 5432,
        database: process.env.DB_NAME || "placement_prep",
    });

// Handle pool-level errors to prevent crashes
pool.on('error', (err) => {
    console.error('⚠️ Unexpected pool error (connection dropped?):', err.message);
    // Don't crash — the pool will create new connections as needed
});

// Test connection on startup
pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Database connection error:', err.stack);
    } else {
        console.log('✅ Database connected successfully');
        release();
    }
});

module.exports = pool;
