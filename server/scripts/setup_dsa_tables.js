const pool = require('../db');

async function setupDSATables() {
    const client = await pool.connect();
    try {
        console.log('🚀 Setting up DSA Path Tables...\n');

        // 1. Create Tables
        await client.query(`
            DROP TABLE IF EXISTS dsa_topics;
            DROP TABLE IF EXISTS dsa_modules;

            CREATE TABLE dsa_modules (
                module_id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                order_index INTEGER NOT NULL
            );

            CREATE TABLE dsa_topics (
                topic_id SERIAL PRIMARY KEY,
                module_id INTEGER REFERENCES dsa_modules(module_id),
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                problem_id INTEGER REFERENCES problems(problem_id),
                order_index INTEGER NOT NULL
            );
        `);
        console.log('✅ Tables created: dsa_modules, dsa_topics');

        // 2. Seed Modules
        const modules = [
            { title: 'Logic Building', desc: 'Start your journey here. Learn how to think like a programmer.', order: 1 },
            { title: 'Time & Space Complexity', desc: 'Understand the efficiency of your code. Big O notation explained.', order: 2 },
            { title: 'Arrays', desc: 'Master the most fundamental data structure.', order: 3 },
            { title: 'Strings', desc: 'Text processing and manipulation techniques.', order: 4 },
            { title: 'Linked Lists', desc: 'Dynamic data structures and pointer manipulation.', order: 5 }
        ];

        for (const m of modules) {
            const res = await client.query(
                "INSERT INTO dsa_modules (title, description, order_index) VALUES ($1, $2, $3) RETURNING module_id",
                [m.title, m.desc, m.order]
            );
            m.id = res.rows[0].module_id;
        }
        console.log('✅ Modules seeded');

        // 3. Seed Topics (Sample Content)

        // Module 1: Logic Building
        await insertTopic(client, modules[0].id, 'Introduction to Programming', `
# Introduction to Programming

Programming is the art of telling a computer what to do. 

## What is Logic?
Logic is the sequence of steps required to solve a problem. Before writing code, you must design the logic.

### Steps to Solve a Problem:
1. **Understand the Problem**: Read the description carefully.
2. **Identify Inputs & Outputs**: What do you have? What do you need?
3. **Design the Algorithm**: Step-by-step plan.
4. **Dry Run**: Test manually with examples.
5. **Code**: Translate logic to syntax.
        `, null, 1);

        // Module 2: Time Complexity
        await insertTopic(client, modules[1].id, 'Big O Notation', `
# Big O Notation

Big O notation describes the **worst-case scenario** of an algorithm's performance.

## Common Complexities:
- **O(1)**: Constant time (Direct access)
- **O(log n)**: Logarithmic time (Binary Search)
- **O(n)**: Linear time (Simple loop)
- **O(n^2)**: Quadratic time (Nested loops)

## Why it Matters?
In competitive programming, constraints tell you the required complexity:
- n <= 10^6 -> O(n) or O(n log n)
- n <= 10^3 -> O(n^2) allowed
        `, null, 1);

        // Module 3: Arrays
        // Find Max Subarray problem ID
        const maxSubRes = await client.query("SELECT problem_id FROM problems WHERE title ILIKE '%Maximum Subarray%' LIMIT 1");
        const maxSubId = maxSubRes.rows[0]?.problem_id;

        await insertTopic(client, modules[2].id, 'Kadane\'s Algorithm', `
# Maximum Subarray Sum (Kadane's Algorithm)

## Problem Statement
Given an array, find the contiguous subarray with the largest sum.

## Intuition
If we have a negative sum, carrying it forward will only decrease our future sum. So, if the current sum becomes negative, we reset it to 0.

## Algorithm
1. Initialize \`current_sum = 0\` and \`max_sum = INT_MIN\`.
2. Iterate through the array:
   - Add \`arr[i]\` to \`current_sum\`.
   - Update \`max_sum = max(max_sum, current_sum)\`.
   - If \`current_sum < 0\`, reset \`current_sum = 0\`.

## Time Complexity
- **O(n)**: We pass through the array once.
- **Space**: O(1).

## Code Snippet
\`\`\`cpp
int maxSubArray(vector<int>& nums) {
    int maxSum = INT_MIN, curr = 0;
    for(int x : nums) {
        curr += x;
        maxSum = max(maxSum, curr);
        if(curr < 0) curr = 0;
    }
    return maxSum;
}
\`\`\`
        `, maxSubId, 1);

        console.log('✅ Topics seeded');
        console.log('\n✨ DSA Path Setup Complete!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

async function insertTopic(client, moduleId, title, content, problemId, order) {
    await client.query(
        "INSERT INTO dsa_topics (module_id, title, content, problem_id, order_index) VALUES ($1, $2, $3, $4, $5)",
        [moduleId, title, content, problemId, order]
    );
}

setupDSATables();
