const pool = require('../db');

// Consolidated problem templates for remaining topics
const remainingProblems = [
    // Linked List - Easy (5)
    { topic: 'Linked List', difficulty: 'Easy', title: 'Reverse Linked List', description: 'Reverse a singly linked list.', input_format: 'Space-separated node values.', output_format: 'Space-separated reversed values.', constraints: '0 ≤ n ≤ 5000', sample_input: '1 2 3 4 5', sample_output: '5 4 3 2 1', hidden: [{ i: '1', o: '1' }, { i: '', o: '' }, { i: '1 2', o: '2 1' }] },
    { topic: 'Linked List', difficulty: 'Easy', title: 'Merge Two Sorted Lists', description: 'Merge two sorted linked lists.', input_format: 'Two lines: lists as space-separated values.', output_format: 'Merged list.', constraints: '0 ≤ n ≤ 50', sample_input: '1 2 4\n1 3 4', sample_output: '1 1 2 3 4 4', hidden: [{ i: '\n', o: '' }, { i: '1\n2', o: '1 2' }, { i: '5\n1 2 3 4', o: '1 2 3 4 5' }] },
    { topic: 'Linked List', difficulty: 'Easy', title: 'Linked List Cycle', description: 'Detect if linked list has a cycle.', input_format: 'First line: nodes. Second line: cycle position (-1 for none).', output_format: '"true" or "false".', constraints: '0 ≤ n ≤ 10^4', sample_input: '3 2 0 -4\n1', sample_output: 'true', hidden: [{ i: '1\n-1', o: 'false' }, { i: '1 2\n0', o: 'true' }, { i: '1\n-1', o: 'false' }] },
    { topic: 'Linked List', difficulty: 'Easy', title: 'Remove Linked List Elements', description: 'Remove all elements from linked list with value val.', input_format: 'First line: list. Second line: val.', output_format: 'Modified list.', constraints: '0 ≤ n ≤ 10^4', sample_input: '1 2 6 3 4 5 6\n6', sample_output: '1 2 3 4 5', hidden: [{ i: '\n1', o: '' }, { i: '7 7 7 7\n7', o: '' }, { i: '1 2 3\n4', o: '1 2 3' }] },
    { topic: 'Linked List', difficulty: 'Easy', title: 'Palindrome Linked List', description: 'Check if linked list is palindrome.', input_format: 'Space-separated values.', output_format: '"true" or "false".', constraints: '1 ≤ n ≤ 10^5', sample_input: '1 2 2 1', sample_output: 'true', hidden: [{ i: '1 2', o: 'false' }, { i: '1', o: 'true' }, { i: '1 2 3 2 1', o: 'true' }] },

    // Linked List - Medium (5)  
    { topic: 'Linked List', difficulty: 'Medium', title: 'Add Two Numbers', description: 'Add two numbers represented as linked lists (reverse order).', input_format: 'Two lines: space-separated digits.', output_format: 'Result list.', constraints: '1 ≤ n ≤ 100', sample_input: '2 4 3\n5 6 4', sample_output: '7 0 8', hidden: [{ i: '0\n0', o: '0' }, { i: '9 9 9\n9 9 9 9', o: '8 9 9 0 1' }, { i: '5\n5', o: '0 1' }] },
    { topic: 'Linked List', difficulty: 'Medium', title: 'Remove Nth Node From End', description: 'Remove nth node from end of list.', input_format: 'First line: list. Second line: n.', output_format: 'Modified list.', constraints: '1 ≤ n ≤ size', sample_input: '1 2 3 4 5\n2', sample_output: '1 2 3 5', hidden: [{ i: '1\n1', o: '' }, { i: '1 2\n1', o: '1' }, { i: '1 2\n2', o: '2' }] },
    { topic: 'Linked List', difficulty: 'Medium', title: 'Reorder List', description: 'Reorder list: L0→Ln→L1→Ln-1→...', input_format: 'Space-separated values.', output_format: 'Reordered list.', constraints: '1 ≤ n ≤ 5×10^4', sample_input: '1 2 3 4', sample_output: '1 4 2 3', hidden: [{ i: '1 2 3 4 5', o: '1 5 2 4 3' }, { i: '1', o: '1' }, { i: '1 2', o: '1 2' }] },
    { topic: 'Linked List', difficulty: 'Medium', title: 'Swap Nodes in Pairs', description: 'Swap every two adjacent nodes.', input_format: 'Space-separated values.', output_format: 'Swapped list.', constraints: '0 ≤ n ≤ 100', sample_input: '1 2 3 4', sample_output: '2 1 4 3', hidden: [{ i: '', o: '' }, { i: '1', o: '1' }, { i: '1 2 3', o: '2 1 3' }] },
    { topic: 'Linked List', difficulty: 'Medium', title: 'Rotate List', description: 'Rotate list to the right by k places.', input_format: 'First line: list. Second line: k.', output_format: 'Rotated list.', constraints: '0 ≤ n ≤ 500, 0 ≤ k ≤ 2×10^9', sample_input: '1 2 3 4 5\n2', sample_output: '4 5 1 2 3', hidden: [{ i: '0 1 2\n4', o: '2 0 1' }, { i: '1 2\n0', o: '1 2' }, { i: '1\n99', o: '1' }] },

    // Linked List - Hard (3)
    { topic: 'Linked List', difficulty: 'Hard', title: 'Reverse Nodes in k-Group', description: 'Reverse every k group of nodes.', input_format: 'First line: list. Second line: k.', output_format: 'Modified list.', constraints: '1 ≤ k ≤ n ≤ 5000', sample_input: '1 2 3 4 5\n2', sample_output: '2 1 4 3 5', hidden: [{ i: '1 2 3 4 5\n3', o: '3 2 1 4 5' }, { i: '1\n1', o: '1' }, { i: '1 2 3 4 5\n1', o: '1 2 3 4 5' }] },
    { topic: 'Linked List', difficulty: 'Hard', title: 'Merge k Sorted Lists', description: 'Merge k sorted linked lists.', input_format: 'First line: k. Next k lines: sorted lists.', output_format: 'Merged list.', constraints: '0 ≤ k ≤ 10^4', sample_input: '3\n1 4 5\n1 3 4\n2 6', sample_output: '1 1 2 3 4 4 5 6', hidden: [{ i: '0', o: '' }, { i: '1\n', o: '' }, { i: '2\n1\n2', o: '1 2' }] },
    { topic: 'Linked List', difficulty: 'Hard', title: 'Copy List with Random Pointer', description: 'Deep copy linked list with random pointers.', input_format: 'Each line: val next_idx random_idx.', output_format: 'Copied list info.', constraints: '0 ≤ n ≤ 1000', sample_input: '7 1 -1\n13 2 0\n11 3 2\n10 4 1\n1 -1 -1', sample_output: '7 1 -1\n13 2 0\n11 3 2\n10 4 1\n1 -1 -1', hidden: [{ i: '1 -1 -1', o: '1 -1 -1' }, { i: '', o: '' }, { i: '1 1 1\n2 -1 0', o: '1 1 1\n2 -1 0' }] },

    // Stack - Easy (5)
    { topic: 'Stack', difficulty: 'Easy', title: 'Valid Parentheses', description: 'Check if string of parentheses is valid.', input_format: 'Single string.', output_format: '"true" or "false".', constraints: '1 ≤ length ≤ 10^4', sample_input: '()[]{}', sample_output: 'true', hidden: [{ i: '(]', o: 'false' }, { i: '([)]', o: 'false' }, { i: '{[]}', o: 'true' }] },
    { topic: 'Stack', difficulty: 'Easy', title: 'Min Stack', description: 'Design stack with push, pop, top, getMin in O(1).', input_format: 'Operations: "push x", "pop", "top", "getMin".', output_format: 'Results for top/getMin operations.', constraints: '1 ≤ operations ≤ 3×10^4', sample_input: 'push -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin', sample_output: '-3\n0\n-2', hidden: [{ i: 'push 1\ngetMin', o: '1' }, { i: 'push 5\npush 1\npop\ngetMin', o: '5' }, { i: 'push 0\npush 1\npush 0\ngetMin', o: '0' }] },
    { topic: 'Stack', difficulty: 'Easy', title: 'Baseball Game', description: 'Calculate score based on operations.', input_format: 'Each line: number, "+", "D", or "C".', output_format: 'Total score.', constraints: '1 ≤ ops ≤ 1000', sample_input: '5\n2\nD\n+\nC', sample_output: '30', hidden: [{ i: '5\n-2\n4\nC\nD\n9\n+\n+', o: '27' }, { i: '1', o: '1' }, { i: '1\nC', o: '0' }] },
    { topic: 'Stack', difficulty: 'Easy', title: 'Next Greater Element I', description: 'Find next greater element for each element.', input_format: 'Two lines: query array, full array.', output_format: 'Space-separated results (-1 if none).', constraints: '1 ≤ n ≤ 1000', sample_input: '4 1 2\n1 3 4 2', sample_output: '3 -1 3', hidden: [{ i: '2 4\n1 2 3 4', o: '3 -1' }, { i: '1\n1', o: '-1' }, { i: '1 2\n2 1 3', o: '3 3' }] },
    { topic: 'Stack', difficulty: 'Easy', title: 'Remove Outer Parentheses', description: 'Remove outermost parentheses from primitive decompositions.', input_format: 'String of parentheses.', output_format: 'Result string.', constraints: '1 ≤ length ≤ 10^5', sample_input: '(()())(())', sample_output: '()()()', hidden: [{ i: '()()', o: '' }, { i: '(()())(())(()(()))', o: '()()()()(())' }, { i: '((()))', o: '(())' }] },

    //Stack - Medium (5)
    { topic: 'Stack', difficulty: 'Medium', title: 'Daily Temperatures', description: 'Days until warmer temperature.', input_format: 'Space-separated temperatures.', output_format: 'Space-separated days to wait.', constraints: '1 ≤ n ≤ 10^5', sample_input: '73 74 75 71 69 72 76 73', sample_output: '1 1 4 2 1 1 0 0', hidden: [{ i: '30 40 50 60', o: '1 1 1 0' }, { i: '30 60 90', o: '1 1 0' }, { i: '89 62 70 58 47 47 46 76 100 70', o: '8 1 5 4 3 2 1 1 0 0' }] },
    { topic: 'Stack', difficulty: 'Medium', title: 'Evaluate Reverse Polish Notation', description: 'Evaluate RPN expression.', input_format: 'Space-separated tokens.', output_format: 'Result.', constraints: '1 ≤ tokens ≤ 10^4', sample_input: '2 1 + 3 *', sample_output: '9', hidden: [{ i: '4 13 5 / +', o: '6' }, { i: '10 6 9 3 + -11 * / * 17 + 5 +', o: '22' }, { i: '5', o: '5' }] },
    { topic: 'Stack', difficulty: 'Medium', title: 'Decode String', description: 'Decode string with pattern k[encoded_string].', input_format: 'Encoded string.', output_format: 'Decoded string.', constraints: '1 ≤ length ≤ 30', sample_input: '3[a]2[bc]', sample_output: 'aaabcbc', hidden: [{ i: '3[a2[c]]', o: 'accaccacc' }, { i: '2[abc]3[cd]ef', o: 'abcabccdcdcdef' }, { i: 'abc', o: 'abc' }] },
    { topic: 'Stack', difficulty: 'Medium', title: 'Asteroid Collision', description: 'Simulate asteroid collisions.', input_format: 'Space-separated asteroid sizes (negative = left).', output_format: 'Remaining asteroids.', constraints: '2 ≤ n ≤ 10^4', sample_input: '5 10 -5', sample_output: '5 10', hidden: [{ i: '8 -8', o: '' }, { i: '10 2 -5', o: '10' }, { i: '-2 -1 1 2', o: '-2 -1 1 2' }] },
    { topic: 'Stack', difficulty: 'Medium', title: 'Remove K Digits', description: 'Remove k digits to make smallest number.', input_format: 'Number string and k.', output_format: 'Smallest number (no leading zeros).', constraints: '1 ≤ k ≤ length ≤ 10^5', sample_input: '1432219\n3', sample_output: '1219', hidden: [{ i: '10200\n1', o: '200' }, { i: '10\n2', o: '0' }, { i: '9\n1', o: '0' }] },

    // Stack - Hard (2)
    { topic: 'Stack', difficulty: 'Hard', title: 'Largest Rectangle in Histogram', description: 'Find largest rectangular area in histogram.', input_format: 'Space-separated heights.', output_format: 'Maximum area.', constraints: '1 ≤ n ≤ 10^5', sample_input: '2 1 5 6 2 3', sample_output: '10', hidden: [{ i: '2 4', o: '4' }, { i: '1', o: '1' }, { i: '5 5 5 5', o: '20' }] },
    { topic: 'Stack', difficulty: 'Hard', title: 'Maximal Rectangle', description: 'Find maximal rectangle in binary matrix.', input_format: 'First line: rows cols. Next rows: binary strings.', output_format: 'Maximum rectangle area.', constraints: '1 ≤ rows,cols ≤ 200', sample_input: '4 5\n10100\n10111\n11111\n10010', sample_output: '6', hidden: [{ i: '1 1\n0', o: '0' }, { i: '1 1\n1', o: '1' }, { i: '2 2\n11\n11', o: '4' }] },
];

async function addRemainingProblems() {
    const client = await pool.connect();

    try {
        console.log('Adding remaining problems...\\n');
        let added = 0;

        for (const prob of remainingProblems) {
            const exists = await client.query('SELECT 1 FROM problems WHERE title = $1', [prob.title]);
            if (exists.rows.length > 0) {
                console.log(`⏭️  Skip: ${prob.title}`);
                continue;
            }

            const ins = await client.query(
                `INSERT INTO problems (title, description, difficulty, topic, input_format, output_format, constraints)
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING problem_id`,
                [prob.title, prob.description, prob.difficulty, prob.topic, prob.input_format, prob.output_format, prob.constraints]
            );

            const pid = ins.rows[0].problem_id;
            await client.query(
                'INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1, $2, $3, true)',
                [pid, prob.sample_input, prob.sample_output]
            );

            for (const t of prob.hidden) {
                await client.query(
                    'INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1, $2, $3, false)',
                    [pid, t.i, t.o]
                );
            }

            added++;
            console.log(`✅ ${prob.topic} ${prob.difficulty}: ${prob.title}`);
        }

        console.log(`\\n✨ Added ${added} problems in batch 1!`);
    } catch (err) {
        console.error('Error:', err);
        throw err;
    } finally {
        client.release();
        await pool.end();
    }
}

addRemainingProblems();
