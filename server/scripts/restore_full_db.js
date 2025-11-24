const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function runScript(scriptName) {
    console.log(`\n>>> Running ${scriptName}...`);
    try {
        execSync(`node scripts/${scriptName}`, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
        console.log(`>>> ${scriptName} completed successfully.`);
    } catch (error) {
        console.error(`>>> Error running ${scriptName}:`, error.message);
        process.exit(1);
    }
}

async function executeSqlFile(fileName) {
    console.log(`\n>>> Executing SQL file ${fileName}...`);
    const client = await pool.connect();
    try {
        const sqlPath = path.join(__dirname, fileName);
        if (!fs.existsSync(sqlPath)) {
            throw new Error(`SQL file not found: ${sqlPath}`);
        }
        const sql = fs.readFileSync(sqlPath, 'utf-8');
        await client.query(sql);
        console.log(`>>> ${fileName} executed successfully.`);
    } catch (error) {
        console.error(`>>> Error executing ${fileName}:`, error.message);
        process.exit(1);
    } finally {
        client.release();
    }
}

async function main() {
    try {
        // 1. Generate base problems SQL (includes my new additions to generateProblems.js)
        await runScript('generateProblems.js');

        // 2. Seed base problems (Wipes DB first!)
        await runScript('seedProblems.js');

        // 3. Generate additional problems SQL
        await runScript('generateAdditionalProblems.js');

        // 4. Execute additional problems SQL (since no script does this automatically)
        await executeSqlFile('additional_problems_seed.sql');

        // 5. Run other add scripts (they do INSERT/UPDATE)
        await runScript('addArrayStringProblems.js');
        await runScript('addLinkedListTreeGraphProblems.js');
        await runScript('addMiscProblems.js');
        await runScript('addMoreProblems.js');

        // 6. Verify count
        const client = await pool.connect();
        const res = await client.query('SELECT COUNT(*) FROM problems');
        console.log(`\n✅ Total problems in database: ${res.rows[0].count}`);
        client.release();

    } catch (error) {
        console.error('Restoration failed:', error);
    } finally {
        await pool.end();
    }
}

main();
