const pool = require('../db');

async function verifyStringsModule() {
    try {
        const result = await pool.query(`
            SELECT t.content
            FROM dsa_topics t 
            JOIN dsa_modules m ON t.module_id = m.module_id 
            WHERE t.title LIKE '%Extra Practice%' 
            AND m.title LIKE '%Strings%'
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            console.log('════════════════════════════════════════════════════════');
            console.log('📝 STRINGS EXTRA PRACTICE CONTENT');
            console.log('════════════════════════════════════════════════════════\n');
            console.log(result.rows[0].content);
            console.log('\n════════════════════════════════════════════════════════');

            const content = result.rows[0].content;
            const matches = (content.match(/Valid Palindrome/g) || []).length;
            console.log(`\n🔍 Occurrences of 'Valid Palindrome': ${matches}`);

            if (matches === 1) {
                console.log('✅ SUCCESS: "Valid Palindrome" appears exactly once.');
            } else {
                console.log(`❌ WARNING: "Valid Palindrome" appears ${matches} times.`);
            }
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

verifyStringsModule();
