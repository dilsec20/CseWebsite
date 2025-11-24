const pool = require('../db');

async function phase5FixAllDocs() {
    const client = await pool.connect();
    try {
        console.log('🚀 PHASE 5: Fix ALL Missing Documentation\n');
        console.log('='.repeat(60) + '\n');

        // Get ALL problems missing documentation (no limit)
        const problems = await client.query(`
            SELECT 
                p.problem_id,
                p.title,
                p.description,
                p.difficulty,
                t.input as sample_input
            FROM problems p
            LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = true
            WHERE 
                (p.description NOT ILIKE '%Input Format%' OR
                 p.description NOT ILIKE '%Output Format%' OR
                 p.description NOT ILIKE '%Constraints%')
                AND p.description IS NOT NULL
                AND length(p.description) > 50
            ORDER BY p.problem_id ASC
        `);

        console.log(`Found ${problems.rows.length} problems needing documentation fixes.\n`);

        let fixed = 0;

        for (const p of problems.rows) {
            const template = generateTemplate(p);
            const newDescription = p.description + '\n\n' + template;

            await client.query(
                "UPDATE problems SET description = $1 WHERE problem_id = $2",
                [newDescription, p.problem_id]
            );

            console.log(`✅ [${p.problem_id}] ${p.title}`);
            fixed++;
        }

        console.log(`\n✨ Phase 5 Complete! Fixed ${fixed} problems.\n`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

function generateTemplate(problem) {
    const { description, sample_input, difficulty } = problem;

    let template = '';

    // Check what's missing
    const needsInput = !description.includes('Input Format') && !description.includes('Input:');
    const needsOutput = !description.includes('Output Format') && !description.includes('Output:');
    const needsConstraints = !description.includes('Constraints');

    if (needsInput) {
        template += '**Input Format:**\n';
        if (sample_input) {
            const lines = sample_input.trim().split('\n');
            if (lines.length === 1) {
                template += lines[0].includes(' ') ? '- Space-separated values\n' : '- A single value\n';
            } else {
                template += '- First line: Size/Count\n- Second line: Values\n';
            }
        } else {
            template += '- As described in problem statement\n';
        }
        template += '\n';
    }

    if (needsOutput) {
        template += '**Output Format:**\n';
        template += '- Print the result as specified\n\n';
    }

    if (needsConstraints) {
        template += '**Constraints:**\n';
        const limits = {
            'Easy': '- 1 <= n <= 10^3\n- Values fit in integer range\n',
            'Medium': '- 1 <= n <= 10^5\n- -10^4 <= values <= 10^4\n',
            'Hard': '- 1 <= n <= 10^6\n- Values fit in 64-bit integer range\n'
        };
        template += limits[difficulty] || limits['Medium'];
    }

    return template.trim();
}

phase5FixAllDocs();
