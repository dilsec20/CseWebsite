const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: "postgres://postgres_4skc_user:A5sR9gJjXh2tZkLp@dpg-d4i99fpr0fns73ane58g-a.singapore-postgres.render.com/postgres_4skc",
    ssl: {
        rejectUnauthorized: false, // needed for Render
    },
});

module.exports = pool;
