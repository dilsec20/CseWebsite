const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

// Problem-specific format converters
const formatConverters = {
    'Two Sum': {
        inputFormat: '• First line: n (array size) and k (target sum)\n• Second line: n space-separated integers',
        outputFormat: '• Two space-separated indices (0-indexed), or -1 -1 if no solution exists',
        constraints: '• 2 ≤ n ≤ 10^4\n• -10^9 ≤ array elements ≤ 10^9\n• -10^9 ≤ k ≤ 10^9',
        convertInput: (input) => {
            // Convert "[2,7,11,15]\n9" to "4 9\n2 7 11 15"
            const lines = input.trim().split('\n');
            if (lines.length === 2) {
                const arr = lines[0].match(/-?\d+/g) || [];
                const target = lines[1].trim();
                return `${arr.length} ${target}\n${arr.join(' ')}`;
            }
            return input;
        },
        convertOutput: (output) => {
            // Convert "[0,1]" to "0 1"
            const nums = output.match(/-?\d+/g);
            return nums ? nums.join(' ') : '-1 -1';
        }
    },

    'Best Time to Buy and Sell Stock': {
        inputFormat: '• First line: n (number of days)\n• Second line: n space-separated integers (stock prices)',
        outputFormat: '• Single integer representing maximum profit',
        constraints: '• 1 ≤ n ≤ 10^5\n• 0 ≤ prices[i] ≤ 10^4',
        convertInput: (input) => {
            const arr = input.match(/-?\d+/g) || [];
            return `${arr.length}\n${arr.join(' ')}`;
        },
        convertOutput: (output) => output.trim()
    },

    'Maximum Subarray': {
        inputFormat: '• First line: n (array size)\n• Second line: n space-separated integers',
        outputFormat: '• Single integer representing maximum subarray sum',
        constraints: '• 1 ≤ n ≤ 10^5\n• -10^4 ≤ array elements ≤ 10^4',
        convertInput: (input) => {
            const arr = input.match(/-?\d+/g) || [];
            return `${arr.length}\n${arr.join(' ')}`;
        },
        convertOutput: (output) => output.trim()
    }
};

// Default format for generic array problems
const defaultArrayFormat = {
    inputFormat: '• First line: n (array size)\n• Second line: n space-separated integers',
    outputFormat: '• Output as specified in problem description',
    constraints: '• 1 ≤ n ≤ 10^5\n• -10^9 ≤ array elements ≤ 10^9',
    convertInput: (input) => {
        const arr = input.match(/-?\d+/g) || [];
        if (arr.length > 0) {
            return `${arr.length}\n${arr.join(' ')}`;
        }
        return input;
    },
    convertOutput: (output) => {
        // Try to convert array output to space-separated
        const nums = output.match(/-?\d+/g);
        return nums ? nums.join(' ') : output.trim();
    }
};

async function reformatProblems() {
    const client = await pool.connect();

    try {
        console.log('🔗 Connected to PostgreSQL...\n');

        // Step 1: Add new columns if they don't exist
        console.log('📝 Adding format columns to problems table...');
        await client.query(`
            ALTER TABLE problems 
            ADD COLUMN IF NOT EXISTS input_format TEXT,
            ADD COLUMN IF NOT EXISTS output_format TEXT,
            ADD COLUMN IF NOT EXISTS constraints TEXT
        `);
        console.log('✅ Columns added\n');

        // Step 2: Get all problems
        const problems = await client.query('SELECT problem_id, title, topic FROM problems ORDER BY problem_id');

        console.log(`📊 Found ${problems.rows.length} problems to reformat\n`);
        console.log('🔄 Reformatting problems...\n');

        let updated = 0;

        for (const problem of problems.rows) {
            const formatter = formatConverters[problem.title] || defaultArrayFormat;

            // Update problem with format info
            await client.query(`
                UPDATE problems 
                SET input_format = $1, output_format = $2, constraints = $3
                WHERE problem_id = $4
            `, [formatter.inputFormat, formatter.outputFormat, formatter.constraints, problem.problem_id]);

            // Update test cases for this problem
            const testCases = await client.query(
                'SELECT test_case_id, input, expected_output FROM test_cases WHERE problem_id = $1',
                [problem.problem_id]
            );

            for (const tc of testCases.rows) {
                const newInput = formatter.convertInput(tc.input);
                const newOutput = formatter.convertOutput(tc.expected_output);

                await client.query(
                    'UPDATE test_cases SET input = $1, expected_output = $2 WHERE test_case_id = $3',
                    [newInput, newOutput, tc.test_case_id]
                );
            }

            updated++;
            if (updated % 50 === 0) {
                console.log(`   ✓ Processed ${updated} problems...`);
            }
        }

        console.log(`\n✅ Successfully reformatted ${updated} problems!`);

        // Show sample of updated problem
        console.log('\n📋 Sample Updated Problem:\n');
        const sample = await client.query(`
            SELECT title, input_format, output_format, constraints
            FROM problems
            WHERE title = 'Two Sum'
            LIMIT 1
        `);

        if (sample.rows.length > 0) {
            const p = sample.rows[0];
            console.log(`Title: ${p.title}`);
            console.log(`\nInput Format:\n${p.input_format}`);
            console.log(`\nOutput Format:\n${p.output_format}`);
            console.log(`\nConstraints:\n${p.constraints}`);
        }

        // Show sample test case
        console.log('\n📋 Sample Updated Test Case:\n');
        const sampleTC = await client.query(`
            SELECT input, expected_output
            FROM test_cases
            WHERE problem_id = (SELECT problem_id FROM problems WHERE title = 'Two Sum' LIMIT 1)
            AND is_sample = true
            LIMIT 1
        `);

        if (sampleTC.rows.length > 0) {
            console.log(`Input:\n${sampleTC.rows[0].input}`);
            console.log(`\nExpected Output:\n${sampleTC.rows[0].expected_output}`);
        }

        // Stats
        console.log('\n📊 Reformatting Statistics:');
        const stats = await client.query(`
            SELECT COUNT(*) as total_problems,
                   (SELECT COUNT(*) FROM test_cases) as total_test_cases
            FROM problems
        `);
        console.log(`   • Problems updated: ${stats.rows[0].total_problems}`);
        console.log(`   • Test cases updated: ${stats.rows[0].total_test_cases}`);

    } catch (error) {
        console.error('❌ Reformatting failed:', error.message);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run
reformatProblems()
    .then(() => {
        console.log('\n🎉 All problems reformatted to Codeforces/CSES style!');
        process.exit(0);
    })
    .catch(error => {
        console.error('\nReformatting failed:', error);
        process.exit(1);
    });
