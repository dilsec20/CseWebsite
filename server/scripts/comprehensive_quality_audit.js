const pool = require('../db');

async function comprehensiveAudit() {
    const client = await pool.connect();
    try {
        console.log('🔍 Starting Comprehensive Problem Quality Audit...\n');

        // Get all problems with their sample test cases
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
            ORDER BY p.problem_id ASC
        `);

        const issues = [];

        for (const problem of problems.rows) {
            const problemIssues = {
                id: problem.problem_id,
                title: problem.title,
                issues: []
            };

            // 1. Check for missing description sections
            const desc = problem.description || '';
            if (!desc.includes('Input Format') && !desc.includes('Input:')) {
                problemIssues.issues.push('Missing Input Format section');
            }
            if (!desc.includes('Output Format') && !desc.includes('Output:')) {
                problemIssues.issues.push('Missing Output Format section');
            }
            if (!desc.includes('Constraints')) {
                problemIssues.issues.push('Missing Constraints section');
            }

            // 2. Check for missing sample test case
            if (!problem.sample_input) {
                problemIssues.issues.push('Missing sample test case');
            }

            // 3. Check for input format consistency
            if (problem.sample_input && desc.includes('First line:')) {
                // If description mentions "First line", check if sample has multiple lines
                const inputLines = problem.sample_input.trim().split('\n');
                const descLines = (desc.match(/First line:|Second line:|Third line:/g) || []).length;

                // Count how many "line" mentions in description
                if (descLines > inputLines.length) {
                    problemIssues.issues.push(`Description mentions ${descLines} lines but sample has ${inputLines.length} lines`);
                }
            }

            // 4. Check for very short descriptions (likely incomplete)
            if (desc.length < 150) {
                problemIssues.issues.push(`Description too short (${desc.length} chars)`);
            }

            // 5. Check for placeholder/dummy data
            if (desc.includes('TODO') || desc.includes('FIXME') || desc.includes('placeholder')) {
                problemIssues.issues.push('Contains placeholder text');
            }
            if (problem.sample_output && (
                problem.sample_output.toLowerCase().includes('null') ||
                problem.sample_output.toLowerCase().includes('undefined')
            )) {
                problemIssues.issues.push('Sample output contains null/undefined');
            }

            if (problemIssues.issues.length > 0) {
                issues.push(problemIssues);
            }
        }

        // Print report
        console.log(`\n📊 AUDIT SUMMARY`);
        console.log(`Total Problems: ${problems.rows.length}`);
        console.log(`Problems with Issues: ${issues.length}\n`);

        if (issues.length > 0) {
            console.log(`\n⚠️  ISSUES FOUND:\n`);
            issues.slice(0, 20).forEach((p, idx) => {
                console.log(`${idx + 1}. [${p.id}] ${p.title}`);
                p.issues.forEach(issue => console.log(`   - ${issue}`));
                console.log('');
            });

            if (issues.length > 20) {
                console.log(`... and ${issues.length - 20} more problems with issues.\n`);
            }
        } else {
            console.log('✅ No issues found!');
        }

        // Save detailed report to file
        const fs = require('fs');
        fs.writeFileSync(
            __dirname + '/audit_report.json',
            JSON.stringify(issues, null, 2)
        );
        console.log(`\n📄 Detailed report saved to: ${__dirname}/audit_report.json`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

comprehensiveAudit();
