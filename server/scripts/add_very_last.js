const pool = require('../db');

const veryLastBatch = [
    // Stack Easy - Need 1
    { t: 'Stack', d: 'Easy', n: 'Backspace String Compare', desc: 'Compare strings with backspace (#).', inp: 'String s. String t.', out: '"true"/"false".', con: '1≤s,t≤200', si: 'ab#c\nad#c', so: 'true', h: [{ i: 'ab##\nc#d#', o: 'true' }, { i: 'a#c\nb', o: 'false' }, { i: 'a##c\n#a#c', o: 'true' }] },

    // Stack Hard - Need 1
    { t: 'Stack', d: 'Hard', n: 'Trapping Rain Water', desc: 'Calculate trapped rainwater.', inp: 'Heights.', out: 'Total water.', con: '1≤n≤2×10^4', si: '0 1 0 2 1 0 1 3 2 1 2 1', so: '6', h: [{ i: '4 2 0 3 2 5', o: '9' }, { i: '1 2 3', o: '0' }, { i: '3 0 2 0 4', o: '7' }] },

    // Queue Hard - Need 1
    { t: 'Queue', d: 'Hard', n: 'Shortest Subarray Sum K', desc: 'Shortest subarray with sum ≥ k.', inp: 'Array. k.', out: 'Min length or -1.', con: '1≤n≤10^5', si: '2 -1 2\n3', so: '3', h: [{ i: '1\n1', o: '1' }, { i: '1 2\n4', o: '-1' }, { i: '84 -37 32 40 95\n167', o: '3' }] },

    // Greedy Hard - Need 1
    { t: 'Greedy', d: 'Hard', n: 'Create Maximum Number', desc: 'Max number from two arrays.', inp: 'Line 1: nums1. Line 2: nums2. Line 3: k.', out: 'Max k-digit number.', con: '1≤k≤m+n', si: '3 4 6 5\n9 1 2 5 8 3\n5', so: '9 8 6 5 3', h: [{ i: '6 7\n6 0 4\n5', o: '6 7 6 0 4' }, { i: '3 9\n8 9\n3', o: '9 8 9' }, { i: '1\n2\n1', o: '2' }] },

    // Additional problems to reach goal
    // Linked List Easy - extra
    { t: 'Linked List', d: 'Easy', n: 'Intersection of Two Lists', desc: 'Find intersection node.', inp: 'Two lists. Intersection index.', out: 'Intersection value or "null".', con: '0≤m,n≤3×10^4', si: '4 1 8 4 5\n5 6 1 8 4 5\n8', so: '8', h: [{ i: '1 9 1 2 4\n3 2 4\n2', o: '2' }, { i: '2 6 4\n1 5\n-1', o: 'null' }, { i: '1\n1\n1', o: '1' }] },

    // Tree Medium - extra
    { t: 'Tree', d: 'Medium', n: 'Count Complete Tree Nodes', desc: 'Count nodes in complete binary tree.', inp: 'Level-order.', out: 'Node count.', con: '0≤n≤5×10^4', si: '1 2 3 4 5 6', so: '6', h: [{ i: '', o: '0' }, { i: '1', o: '1' }, { i: '1 2 3 4', o: '4' }] },

    // Graph Medium - extra
    { t: 'Graph', d: 'Medium', n: 'Cheapest Flights Within K Stops', desc: 'Cheapest flight with ≤ k stops.', inp: 'n. Flights (from to price). src dst k.', out: 'Min price or -1.', con: '1≤n≤100', si: '4\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0 3 3', so: '700', h: [{ i: '3\n0 1 100\n1 2 100\n0 2 500\n0 2 1', o: '200' }, { i: '3\n0 1 100\n1 2 100\n0 2 500\n0 2 0', o: '500' }, { i: '1\n\n0 0 0', o: '0' }] },

    // DP Medium - extra
    { t: 'Dynamic Programming', d: 'Medium', n: 'Best Time Stock Cooldown', desc: 'Max profit with cooldown.', inp: 'Prices.', out: 'Max profit.', con: '1≤n≤5000', si: '1 2 3 0 2', so: '3', h: [{ i: '1', o: '0' }, { i: '1 2 4', o: '3' }, { i: '5 4 3 2 1', o: '0' }] },

    // Backtracking Medium - extra
    { t: 'Backtracking', d: 'Medium', n: 'Restore IP Addresses', desc: 'Generate all valid IP addresses.', inp: 'String of digits.', out: 'All valid IPs.', con: '4≤s≤12', si: '25525511135', so: '255.255.11.135\n255.255.111.35', h: [{ i: '0000', o: '0.0.0.0' }, { i: '101023', o: '1.0.10.23\n1.0.102.3\n10.1.0.23\n10.10.2.3\n101.0.2.3' }, { i: '1111', o: '1.1.1.1' }] },

    // Binary Search Medium - extra
    { t: 'Binary Search', d: 'Medium', n: 'Search 2D Matrix', desc: 'Search in row & column sorted matrix.', inp: 'Matrix. Target.', out: '"true"/"false".', con: '1≤m,n≤300', si: '1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30\n5', so: 'true', h: [{ i: '1 4 7 11 15\n2 5 8 12 19\n3 6 9 16 22\n10 13 14 17 24\n18 21 23 26 30\n20', o: 'false' }, { i: '1\n1', o: 'true' }, { i: '1 3\n2 4\n10', o: 'false' }] },

    // Hashing Medium - extra  
    { t: 'Hashing', d: 'Medium', n: 'Longest Consecutive Sequence', desc: 'Longest consecutive elements sequence.', inp: 'Array.', out: 'Length.', con: '0≤n≤10^5', si: '100 4 200 1 3 2', so: '4', h: [{ i: '0 3 7 2 5 8 4 6 0 1', o: '9' }, { i: '1 2 0 1', o: '3' }, { i: '', o: '0' }] }
];

async function addVeryLastBatch() {
    const c = await pool.connect();
    try {
        console.log('Adding very final batch (11 problems)...\\n');
        let a = 0;
        for (const p of veryLastBatch) {
            const e = await c.query('SELECT 1 FROM problems WHERE title=$1', [p.n]);
            if (e.rows.length) { console.log(`⏭️  ${p.n}`); continue; }
            const i = await c.query(
                'INSERT INTO problems(title,description,difficulty,topic,input_format,output_format,constraints) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING problem_id',
                [p.n, p.desc, p.d, p.t, p.inp, p.out, p.con]
            );
            const pid = i.rows[0].problem_id;
            await c.query('INSERT INTO test_cases(problem_id,input,expected_output,is_sample) VALUES ($1,$2,$3,true)', [pid, p.si, p.so]);
            for (const t of p.h) {
                await c.query('INSERT INTO test_cases(problem_id,input,expected_output,is_sample) VALUES ($1,$2,$3,false)', [pid, t.i, t.o]);
            }
            a++;
            console.log(`✅ ${p.t} ${p.d}: ${p.n}`);
        }
        console.log(`\\n🎉 All done! Added ${a} problems!`);
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
addVeryLastBatch();
