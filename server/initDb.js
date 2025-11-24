const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Use DATABASE_URL if available, otherwise construct from individual env vars
const pool = new Pool({
    connectionString: process.env.DATABASE_URL ||
        `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

async function initializeDatabase() {
    try {
        console.log("🗄️  Connecting to database...");

        // Read and execute schema
        const schemaPath = path.join(__dirname, "database.sql");
        const schema = fs.readFileSync(schemaPath, "utf8");

        console.log("📝 Creating tables...");
        await pool.query(schema);
        console.log("✅ Database tables created successfully!");

        // Initialize mock data if mockData.js exists
        try {
            const mockData = require("./mockData");
            if (mockData && mockData.autoInitialize) {
                console.log("📊 Initializing mock data...");
                await mockData.autoInitialize();
                console.log("✅ Mock data initialized!");
            }
        } catch (err) {
            console.log("ℹ️  No mock data initialization found, skipping...");
        }

        console.log("\n🎉 Database initialization complete!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error initializing database:", error.message);
        console.error(error);
        process.exit(1);
    }
}

initializeDatabase();
