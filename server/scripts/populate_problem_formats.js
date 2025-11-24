const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function populateFormats() {
    const client = await pool.connect();
    try {
        console.log('🚀 Populating problem formats...');

        // Read generateProblems.js
        const filePath = path.join(__dirname, 'generateProblems.js');
        const fileContent = fs.readFileSync(filePath, 'utf8');

        // Create a temporary file that exports the data
        const tempFile = path.join(__dirname, 'temp_data_export.js');

        // Remove the function call at the end and add module.exports
        let newContent = fileContent.replace('generateProblemsSQL();', '// generateProblemsSQL();');
        // Also handle the async function call if it was named differently in previous versions, 
        // but based on file view it is generateProblemsSQL();

        newContent += '\nmodule.exports = realInterviewProblems;\n';

        fs.writeFileSync(tempFile, newContent);

        console.log('📦 Created temporary data module.');

        const problems = require('./temp_data_export.js');
        console.log(`Found ${problems.length} problems in source file.`);

        let updated = 0;
        for (const p of problems) {
            const res = await client.query(`
                UPDATE problems 
                SET input_format = $1, 
                    output_format = $2, 
                    constraints = $3, 
                    source = $4
                WHERE title = $5
            `, [p.input_format, p.output_format, p.constraints, p.source, p.title]);

            if (res.rowCount > 0) updated++;
        }

        console.log(`✅ Updated ${updated} problems with format details!`);

        // Cleanup
        try {
            fs.unlinkSync(tempFile);
        } catch (e) {
            console.log('⚠️ Could not delete temp file:', e.message);
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

populateFormats();
