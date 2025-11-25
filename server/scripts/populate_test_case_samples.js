const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function populateTestCaseSamples() {
    const client = await pool.connect();
    try {
        console.log('🚀 Populating test case sample inputs...');

        // Read generateProblems.js
        const filePath = path.join(__dirname, 'generateProblems.js');
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Create a temporary file that exports the data
        const tempFile = path.join(__dirname, 'temp_test_data_export.js');

        let newContent = fileContent.replace('generateProblemsSQL();', '// generateProblemsSQL();');
        newContent += '\nmodule.exports = realInterviewProblems;\n';

        fs.writeFileSync(tempFile, newContent);

        console.log('📦 Created temporary data module.');

        const problems = require('./temp_test_data_export.js');
        console.log(`Found ${problems.length} problems in source file.`);

        let updated = 0;
        let notFound = 0;

        for (const p of problems) {
            const res = await client.query(`
                UPDATE problems 
                SET test_case_input = $1, 
                    test_case_output = $2
                WHERE title = $3
            `, [p.test_input, p.test_output, p.title]);

            if (res.rowCount > 0) {
                updated++;
            } else {
                notFound++;
                console.log(`⚠️  Not found: "${p.title}"`);
            }
        }

        console.log(`✅ Updated ${updated} problems with sample test cases!`);
        console.log(`ℹ️  ${notFound} problems not found in database`);

        // Cleanup
        try {
            fs.unlinkSync(tempFile);
        } catch (e) {
            console.log('⚠️ Could not delete temp file:', e.message);
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error(err.stack);
    } finally {
        client.release();
        pool.end();
    }
}

populateTestCaseSamples();
