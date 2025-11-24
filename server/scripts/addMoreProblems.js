const pool = require('../db');

const newProblems = [
    // ==================== HASHING ====================
    {
        title: "Contains Duplicate",
        difficulty: "Easy",
        topic: "Hashing",
        description: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "true or false",
        constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        test_input: "4\n1 2 3 1",
        test_output: "true",
        source: "LeetCode #217",
        hidden_cases: [
            { input: "3\n1 2 3", output: "false" },
            { input: "5\n1 1 1 3 3 4 3 2 4 2", output: "true" }
        ]
    },
    {
        title: "Longest Consecutive Sequence",
        difficulty: "Medium",
        topic: "Hashing",
        description: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "Single integer (length)",
        constraints: "0 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
        test_input: "6\n100 4 200 1 3 2",
        test_output: "4",
        source: "LeetCode #128",
        hidden_cases: [
            { input: "10\n0 3 7 2 5 8 4 6 0 1", output: "9" },
            { input: "0\n", output: "0" }
        ]
    },

    // ==================== GREEDY ====================
    {
        title: "Jump Game",
        difficulty: "Medium",
        topic: "Greedy",
        description: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers",
        output_format: "true or false",
        constraints: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
        test_input: "5\n2 3 1 1 4",
        test_output: "true",
        source: "LeetCode #55",
        hidden_cases: [
            { input: "5\n3 2 1 0 4", output: "false" },
            { input: "1\n0", output: "true" }
        ]
    },
    {
        title: "Gas Station",
        difficulty: "Medium",
        topic: "Greedy",
        description: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.",
        input_format: "First line: n (number of stations)\nSecond line: n space-separated integers (gas)\nThird line: n space-separated integers (cost)",
        output_format: "Single integer (starting index or -1)",
        constraints: "n == gas.length == cost.length\n1 <= n <= 10^5\n0 <= gas[i], cost[i] <= 10^4",
        test_input: "5\n1 2 3 4 5\n3 4 5 1 2",
        test_output: "3",
        source: "LeetCode #134",
        hidden_cases: [
            { input: "3\n2 3 4\n3 4 3", output: "-1" },
            { input: "1\n5\n4", output: "0" }
        ]
    },

    // ==================== QUEUE ====================
    {
        title: "Implement Stack using Queues",
        difficulty: "Easy",
        topic: "Queue",
        description: "Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).\n\nImplement the MyStack class:\n- void push(int x) Pushes element x to the top of the stack.\n- int pop() Removes the element on the top of the stack and returns it.\n- int top() Returns the element on the top of the stack.\n- boolean empty() Returns true if the stack is empty, false otherwise.\n\nNotes:\n- You must use only standard operations of a queue, which means only push to back, peek/pop from front, size and is empty operations are valid.\n- Depending on your language, the queue may not be supported natively. You may simulate a queue using a list or deque (double-ended queue) as long as you use only a queue's standard operations.",
        input_format: "Commands and values (simulated for online judge)",
        output_format: "Outputs of operations",
        constraints: "1 <= x <= 9\nAt most 100 calls will be made to push, pop, top, and empty.\nAll the calls to pop and top are valid.",
        test_input: "MyStack\npush 1\npush 2\ntop\npop\nempty",
        test_output: "2\n2\nfalse",
        source: "LeetCode #225",
        hidden_cases: [] // Complex to simulate with simple I/O, skipping hidden for now
    },

    // ==================== HEAP ====================
    {
        title: "Kth Largest Element in an Array",
        difficulty: "Medium",
        topic: "Heap",
        description: "Given an integer array nums and an integer k, return the kth largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.\n\nCan you solve it without sorting?",
        input_format: "First line: n (size of array)\nSecond line: n space-separated integers\nThird line: k",
        output_format: "Single integer",
        constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
        test_input: "6\n3 2 1 5 6 4\n2",
        test_output: "5",
        source: "LeetCode #215",
        hidden_cases: [
            { input: "9\n3 2 3 1 2 4 5 5 6\n4", output: "4" },
            { input: "1\n1\n1", output: "1" }
        ]
    }
];

async function seedMoreProblems() {
    const client = await pool.connect();
    try {
        console.log(`Seeding ${newProblems.length} new problems...`);

        for (const problem of newProblems) {
            // Check if problem exists
            const checkRes = await client.query('SELECT problem_id FROM problems WHERE title = $1', [problem.title]);

            let problemId;
            if (checkRes.rows.length > 0) {
                console.log(`Updating: ${problem.title}`);
                problemId = checkRes.rows[0].problem_id;
                await client.query(`
                    UPDATE problems 
                    SET description = $1, difficulty = $2, topic = $3, 
                        input_format = $4, output_format = $5, constraints = $6, source = $7,
                        test_case_input = $8, test_case_output = $9
                    WHERE problem_id = $10
                `, [problem.description, problem.difficulty, problem.topic,
                problem.input_format, problem.output_format, problem.constraints, problem.source,
                problem.test_input, problem.test_output,
                    problemId]);
            } else {
                console.log(`Creating: ${problem.title}`);
                const insertRes = await client.query(`
                    INSERT INTO problems (title, description, difficulty, topic, input_format, output_format, constraints, source, test_case_input, test_case_output)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                    RETURNING problem_id
                `, [problem.title, problem.description, problem.difficulty, problem.topic,
                problem.input_format, problem.output_format, problem.constraints, problem.source,
                problem.test_input, problem.test_output]);
                problemId = insertRes.rows[0].problem_id;
            }

            // Add sample test case
            await client.query('DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = true', [problemId]);
            await client.query(`
                INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                VALUES ($1, $2, $3, true, 1)
            `, [problemId, problem.test_input, problem.test_output]);

            // Add hidden test cases
            if (problem.hidden_cases && problem.hidden_cases.length > 0) {
                await client.query('DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = false', [problemId]);
                let order = 2;
                for (const hidden of problem.hidden_cases) {
                    await client.query(`
                        INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                        VALUES ($1, $2, $3, false, $4)
                    `, [problemId, hidden.input, hidden.output, order++]);
                }
                console.log(`  Added ${problem.hidden_cases.length} hidden test cases`);
            }
        }

        console.log('Done!');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        pool.end();
    }
}

seedMoreProblems();
