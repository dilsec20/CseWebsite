const pool = require('../db');

const batch2 = [
    // Queue - Easy (5)
    { topic: 'Queue', difficulty: 'Easy', title: 'Implement Queue using Stacks', description: 'Implement FIFO queue using only two stacks.', input_format: 'Operations: "push x", "pop", "peek", "empty".', output_format: 'Results for pop/peek/empty.', constraints: '1 ≤ ops ≤ 100', sample_input: 'push 1\npush 2\npeek\npop\nempty', sample_output: '1\n1\nfalse', hidden: [{ i: 'push 1\npop\nempty', o: '1\ntrue' }, { i: 'push 5\npeek', o: '5' }, { i: 'empty', o: 'true' }] },
    { topic: 'Queue', difficulty: 'Easy', title: 'Design Circular Queue', description: 'Design circular queue with fixed size.', input_format: 'First line: size. Next: operations.', output_format: 'Operation results.', constraints: '1 ≤ k ≤ 1000', sample_input: '3\nenqueue 1\nenqueue 2\ndequeue\nenqueue 3', sample_output: 'true\ntrue\ntrue\ntrue', hidden: [{ i: '2\nenqueue 1\nenqueue 2\nenqueue 3', o: 'true\ntrue\nfalse' }, { i: '1\nenqueue 1\ndequeue', o: 'true\ntrue' }, { i: '5\nisEmpty', o: 'true' }] },
    { topic: 'Queue', difficulty: 'Easy', title: 'Number of Recent Calls', description: 'Count requests in last 3000ms.', input_format: 'Timestamps one per line.', output_format: 'Count after each ping.', constraints: '1 ≤ calls ≤ 10^4', sample_input: '1\n100\n3001\n3002', sample_output: '1\n2\n3\n3', hidden: [{ i: '1', o: '1' }, { i: '1\n2\n3\n4\n5', o: '1\n2\n3\n4\n5' }, { i: '1\n3001', o: '1\n1' }] },
    { topic: 'Queue', difficulty: 'Easy', title: 'First Unique Character in Stream', description: 'Find first non-repeating character after each insertion.', input_format: 'String of characters added one by one.', output_format: 'First unique char after each add ("-1" if none).', constraints: '1 ≤ length ≤ 4×10^4', sample_input: 'aabcc', sample_output: 'a\n-1\nb\nb\n-1', hidden: [{ i: 'a', o: 'a' }, { i: 'aa', o: 'a\n-1' }, { i: 'abc', o: 'a\na\na' }] },
    { topic: 'Queue', difficulty: 'Easy', title: 'Time Needed to Buy Tickets', description: 'Calculate time for person at position k to buy tickets.', input_format: 'First line: tickets array. Second line: k.', output_format: 'Time in seconds.', constraints: '1 ≤ n ≤ 100', sample_input: '2 3 2\n2', sample_output: '6', hidden: [{ i: '5 1 1 1\n0', o: '8' }, { i: '1\n0', o: '1' }, { i: '10 9 8\n1', o: '17' }] },

    // Queue - Medium (5)
    { topic: 'Queue', difficulty: 'Medium', title: 'Sliding Window Maximum', description: 'Find max in each sliding window.', input_format: 'First line: n k. Second line: array.', output_format: 'Max values.', constraints: '1 ≤ k ≤ n ≤ 10^5', sample_input: '8 3\n1 3 -1 -3 5 3 6 7', sample_output: '3 3 5 5 6 7', hidden: [{ i: '1 1\n5', o: '5' }, { i: '3 2\n1 2 3', o: '2 3' }, { i: '5 3\n9 10 9 -7 -4', o: '10 10 9' }] },
    { topic: 'Queue', difficulty: 'Medium', title: 'Jump Game VI', description: 'Max score jumping at most k steps.', input_format: 'First line: n k. Second line: array.', output_format: 'Maximum score.', constraints: '1 ≤ n ≤ 10^5', sample_input: '5 3\n1 -1 -2 4 -7', sample_output: '7', hidden: [{ i: '10 4\n10 -5 -2 4 0 3 -1 -3 7 -2', o: '17' }, { i: '3 1\n1 2 3', o: '6' }, { i: '1 1\n5', o: '5' }] },
    { topic: 'Queue', difficulty: 'Medium', title: 'Shortest Subarray with Sum K', description: 'Find shortest subarray with sum ≥ k.', input_format: 'First line: n k. Second line: array.', output_format: 'Shortest length or -1.', constraints: '1 ≤ n ≤ 10^5', sample_input: '5 7\n2 -1 2 3 1', sample_output: '2', hidden: [{ i: '3 3\n1 1 1', o: '3' }, { i: '3 81\n1 2 3', o: '-1' }, { i: '5 20\n1 -1 4 5 10', o: '3' }] },
    { topic: 'Queue', difficulty: 'Medium', title: 'Reveal Cards Increasing', description: 'Arrange deck to reveal in increasing order.', input_format: 'Space-separated card values.', output_format: 'Deck order.', constraints: '1 ≤ n ≤ 1000', sample_input: '17 13 11 2 3 5 7', sample_output: '2 13 3 11 5 17 7', hidden: [{ i: '1', o: '1' }, { i: '1 2 3 4 5', o: '1 5 2 4 3' }, { i: '1 2', o: '1 2' }] },
    { topic: 'Queue', difficulty: 'Medium', title: 'Dota2 Senate', description: 'Simulate voting rounds.', input_format: 'String of R and D.', output_format: '"Radiant" or "Dire".', constraints: '1 ≤ n ≤ 10^4', sample_input: 'RD', sample_output: 'Radiant', hidden: [{ i: 'RDD', o: 'Dire' }, { i: 'R', o: 'Radiant' }, { i: 'RRDDD', o: 'Dire' }] },

    // Queue - Hard (2)
    { topic: 'Queue', difficulty: 'Hard', title: 'Constrained Subsequence Sum', description: 'Max sum of subsequence with adjacent elements ≤ k apart.', input_format: 'First line: n k. Second line: array.', output_format: 'Maximum sum.', constraints: '1 ≤ k ≤ n ≤ 10^5', sample_input: '5 2\n10 2 -10 5 20', sample_output: '37', hidden: [{ i: '7 2\n-1 -2 -3 -4 -5 -6 -7', o: '-1' }, { i: '3 1\n10 -2 -10', o: '10' }, { i: '4 2\n-5 -1 -3 -2', o: '-1' }] },
    { topic: 'Queue', difficulty: 'Hard', title: 'Maximum of Absolute Value Expression', description: 'Max of |arr1[i]-arr1[j]|+|arr2[i]-arr2[j]|+|i-j|.', input_format: 'First line: n. Second line: arr1. Third line: arr2.', output_format: 'Maximum value.', constraints: '2 ≤ n ≤ 4×10^4', sample_input: '4\n1 2 3 4\n-1 4 5 6', sample_output: '13', hidden: [{ i: '2\n1 2\n3 4', o: '3' }, { i: '3\n1 2 3\n1 2 3', o: '4' }, { i: '1\n5\n5', o: '0' }] },

    // Binary Search - Easy (5)
    { topic: 'Binary Search', difficulty: 'Easy', title: 'Binary Search', description: 'Search for target in sorted array.', input_format: 'First line: n target. Second line: sorted array.', output_format: 'Index or -1.', constraints: '1 ≤ n ≤ 10^4', sample_input: '6 0\n-1 0 3 5 9 12', sample_output: '1', hidden: [{ i: '6 9\n-1 0 3 5 9 12', o: '4' }, { i: '6 2\n-1 0 3 5 9 12', o: '-1' }, { i: '1 5\n5', o: '0' }] },
    { topic: 'Binary Search', difficulty: 'Easy', title: 'Search Insert Position', description: 'Find index where target would be inserted.', input_format: 'First line: n target. Second line: sorted array.', output_format: 'Index.', constraints: '1 ≤ n ≤ 10^4', sample_input: '4 5\n1 3 5 6', sample_output: '2', hidden: [{ i: '4 2\n1 3 5 6', o: '1' }, { i: '4 7\n1 3 5 6', o: '4' }, { i: '1 1\n2', o: '0' }] },
    { topic: 'Binary Search', difficulty: 'Easy', title: 'First Bad Version', description: 'Find first bad version using isBadVersion API.', input_format: 'First line: n. Second line: first bad version.', output_format: 'First bad version.', constraints: '1 ≤ bad ≤ n ≤ 2^31-1', sample_input: '5\n4', sample_output: '4', hidden: [{ i: '1\n1', o: '1' }, { i: '10\n6', o: '6' }, { i: '100\n1', o: '1' }] },
    { topic: 'Binary Search', difficulty: 'Easy', title: 'Perfect Square', description: 'Check if number is perfect square.', input_format: 'Integer n.', output_format: '"true" or "false".', constraints: '1 ≤ n ≤ 2^31-1', sample_input: '16', sample_output: 'true', hidden: [{ i: '14', o: 'false' }, { i: '1', o: 'true' }, { i: '2147483647', o: 'false' }] },
    { topic: 'Binary Search', difficulty: 'Easy', title: 'Sqrt(x)', description: 'Compute square root rounded down.', input_format: 'Integer x.', output_format: 'Floor of sqrt(x).', constraints: '0 ≤ x ≤ 2^31-1', sample_input: '8', sample_output: '2', hidden: [{ i: '4', o: '2' }, { i: '1', o: '1' }, { i: '0', o: '0' }] },

    // Binary Search - Medium (5)
    { topic: 'Binary Search', difficulty: 'Medium', title: 'Find Peak Element', description: 'Find peak element index.', input_format: 'Space-separated array.', output_format: 'Any peak index.', constraints: '1 ≤ n ≤ 1000', sample_input: '1 2 3 1', sample_output: '2', hidden: [{ i: '1 2 1 3 5 6 4', o: '5' }, { i: '1', o: '0' }, { i: '1 2', o: '1' }] },
    { topic: 'Binary Search', difficulty: 'Medium', title: 'Search in Rotated Sorted Array', description: 'Search in rotated sorted array.', input_format: 'First line: n target. Second line: array.', output_format: 'Index or -1.', constraints: '1 ≤ n ≤ 5000', sample_input: '7 0\n4 5 6 7 0 1 2', sample_output: '4', hidden: [{ i: '7 3\n4 5 6 7 0 1 2', o: '-1' }, { i: '1 5\n5', o: '0' }, { i: '3 1\n3 1 2', o: '1' }] },
    { topic: 'Binary Search', difficulty: 'Medium', title: 'Find Minimum in Rotated Array', description: 'Find minimum in rotated sorted array.', input_format: 'Space-separated array.', output_format: 'Minimum value.', constraints: '1 ≤ n ≤ 5000', sample_input: '3 4 5 1 2', sample_output: '1', hidden: [{ i: '4 5 6 7 0 1 2', o: '0' }, { i: '11 13 15 17', o: '11' }, { i: '1', o: '1' }] },
    { topic: 'Binary Search', difficulty: 'Medium', title: 'Koko Eating Bananas', description: 'Min eating speed to finish in h hours.', input_format: 'First line: piles. Second line: h.', output_format: 'Minimum k.', constraints: '1 ≤ piles ≤ 10^4, piles.length ≤ h', sample_input: '3 6 7 11\n8', sample_output: '4', hidden: [{ i: '30 11 23 4 20\n5', o: '30' }, { i: '30 11 23 4 20\n6', o: '23' }, { i: '1000000000\n2', o: '500000000' }] },
    { topic: 'Binary Search', difficulty: 'Medium', title: 'Capacity To Ship Packages', description: 'Min capacity to ship within days.', input_format: 'First line: weights. Second line: days.', output_format: 'Minimum capacity.', constraints: '1 ≤ days ≤ n ≤ 5×10^4', sample_input: '1 2 3 4 5 6 7 8 9 10\n5', sample_output: '15', hidden: [{ i: '3 2 2 4 1 4\n3', o: '6' }, { i: '1 2 3 1 1\n4', o: '3' }, { i: '10\n1', o: '10' }] },

    // Binary Search - Hard (3)
    { topic: 'Binary Search', difficulty: 'Hard', title: 'Median of Two Sorted Arrays', description: 'Find median of two sorted arrays.', input_format: 'First line: m n. Second line: arr1. Third line: arr2.', output_format: 'Median (1 decimal).', constraints: '0 ≤ m,n ≤ 1000', sample_input: '2 2\n1 3\n2 4', sample_output: '2.5', hidden: [{ i: '1 1\n1\n2', o: '1.5' }, { i: '2 1\n1 2\n3', o: '2.0' }, { i: '0 1\n\n1', o: '1.0' }] },
    { topic: 'Binary Search', difficulty: 'Hard', title: 'Split Array Largest Sum', description: 'Minimize largest sum after splitting into k subarrays.', input_format: 'First line: nums. Second line: k.', output_format: 'Minimum largest sum.', constraints: '1 ≤ k ≤ min(50, n)', sample_input: '7 2 5 10 8\n2', sample_output: '18', hidden: [{ i: '1 2 3 4 5\n2', o: '9' }, { i: '1 4 4\n3', o: '4' }, { i: '10\n1', o: '10' }] },
    { topic: 'Binary Search', difficulty: 'Hard', title: 'Count of Range Sum', description: 'Count range sums in [lower, upper].', input_format: 'First line: nums. Second line: lower upper.', output_format: 'Count.', constraints: '1 ≤ n ≤ 10^4', sample_input: '-2 5 -1\n-2 2', sample_output: '3', hidden: [{ i: '0\n0 0', o: '1' }, { i: '1 2 3\n3 3', o: '2' }, { i: '2147483647 -2147483648 -1 0\n-1 0', o: '4' }] }
];

async function addBatch2() {
    const client = await pool.connect();
    try {
        console.log('Adding Queue & Binary Search problems...\\n');
        let added = 0;
        for (const p of batch2) {
            const e = await client.query('SELECT 1 FROM problems WHERE title = $1', [p.title]);
            if (e.rows.length > 0) { console.log(`⏭️  ${p.title}`); continue; }

            const ins = await client.query(
                'INSERT INTO problems (title, description, difficulty, topic, input_format, output_format, constraints) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING problem_id',
                [p.title, p.description, p.difficulty, p.topic, p.input_format, p.output_format, p.constraints]
            );
            const pid = ins.rows[0].problem_id;
            await client.query('INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1,$2,$3,true)',
                [pid, p.sample_input, p.sample_output]);
            for (const t of p.hidden) {
                await client.query('INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1,$2,$3,false)',
                    [pid, t.i, t.o]);
            }
            added++;
            console.log(`✅ ${p.topic} ${p.difficulty}: ${p.title}`);
        }
        console.log(`\\n✨ Added ${added} in batch 2!`);
    } catch (err) { console.error(err); throw err; }
    finally { client.release(); await pool.end(); }
}
addBatch2();
