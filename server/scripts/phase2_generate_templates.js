const pool = require('../db');
const fs = require('fs');

async function phase2GenerateTemplates() {
    const client = await pool.connect();
    try {
        console.log('🚀 PHASE 2: Generating Template Fixes\n');
        console.log('='.repeat(60) + '\n');

        // Get top 50 problems missing documentation
        const problems = await client.query(`
            SELECT 
                p.problem_id,
                p.title,
                p.description,
                p.difficulty,
                t.input as sample_input,
                t.expected_output as sample_output
            FROM problems p
            LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = true
            WHERE 
                (p.description NOT ILIKE '%Input Format%' OR
                 p.description NOT ILIKE '%Output Format%' OR
                 p.description NOT ILIKE '%Constraints%')
                AND p.description IS NOT NULL
                AND length(p.description) > 50
            ORDER BY p.problem_id ASC
            LIMIT 50
        `);

        console.log(`Found ${problems.rows.length} priority problems needing templates\n`);

        const fixes = [];

        for (const p of problems.rows) {
            const fix = {
                problem_id: p.problem_id,
                title: p.title,
                difficulty: p.difficulty,
                current_description: p.description,
                sample_input: p.sample_input,
                sample_output: p.sample_output,
                proposed_addition: generateTemplate(p)
            };

            fixes.push(fix);
            console.log(`✅ [${p.problem_id}] ${p.title} - Template generated`);
        }

        // Save to review file
        fs.writeFileSync(
            __dirname + '/proposed_fixes.json',
            JSON.stringify(fixes, null, 2)
        );

        console.log(`\n📄 Saved ${fixes.length} proposed fixes to: proposed_fixes.json`);
        console.log('\n✨ Phase 2 Complete!\n');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

function generateTemplate(problem) {
    const { description, sample_input, difficulty } = problem;

    let template = '\n\n';

    // Check what's missing and generate accordingly
    const needsInput = !description.includes('Input Format') && !description.includes('Input:');
    const needsOutput = !description.includes('Output Format') && !description.includes('Output:');
    const needsConstraints = !description.includes('Constraints');

    if (needsInput && sample_input) {
        const lines = sample_input.trim().split('\n');
        template += '**Input Format:**\n';

        if (lines.length === 1) {
            if (lines[0].includes(' ')) {
                template += '- Space-separated values\n';
            } else {
                template += '- A single value\n';
            }
        } else if (lines.length === 2) {
            template += '- First line: Size or parameter\n';
            template += '- Second line: Space-separated values\n';
        } else {
            template += `- ${lines.length} lines of input\n`;
        }
        template += '\n';
    }

    if (needsOutput) {
        template += '**Output Format:**\n';
        template += '- Print the result as specified in the problem statement\n\n';
    }

    if (needsConstraints) {
        template += '**Constraints:**\n';
        const limits = {
            'Easy': '- 1 <= n <= 10^3\n- Values fit in standard integer range\n',
            'Medium': '- 1 <= n <= 10^5\n- -10^4 <= values <= 10^4\n',
            'Hard': '- 1 <= n <= 10^6\n- Values fit in 64-bit integer range\n'
        };
        template += limits[difficulty] || limits['Medium'];
    }

    return template.trim();
}

phase2GenerateTemplates();
