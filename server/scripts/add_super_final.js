const pool = require('../db');

const superFinal = [
    // Array Hard - Need 2
    { t: 'Array', d: 'Hard', n: 'Trapping Rain Water', desc: 'Calculate trapped rainwater between bars.', inp: 'Bar heights.', out: 'Total water.', con: '1≤n≤2×10^4', si: '0 1 0 2 1 0 1 3 2 1 2 1', so: '6', h: [{ i: '4 2 0 3 2 5', o: '9' }, { i: '1 2 3', o: '0' }, { i: '3 0 2 0 4', o: '7' }] },
    { t: 'Array', d: 'Hard', n: 'Largest Rectangle in Histogram', desc: 'Find largest rectangle area.', inp: 'Bar heights.', out: 'Max area.', con: '1≤n≤10^5', si: '2 1 5 6 2 3', so: '10', h: [{ i: '2 4', o: '4' }, { i: '1', o: '1' }, { i: '5 5 5 5', o: '20' }] },

    // Linked List Hard - Need 2
    { t: 'Linked List', d: 'Hard', n: 'Sort List', desc: 'Sort linked list in O(n log n).', inp: 'Space-separated values.', out: 'Sorted list.', con: '0≤n≤5×10^4', si: '4 2 1 3', so: '1 2 3 4', h: [{ i: '-1 5 3 4 0', o: '-1 0 3 4 5' }, { i: '', o: '' }, { i: '1', o: '1' }] },
    { t: 'Linked List', d: 'Hard', n: 'Convert Sorted List to BST', desc: 'Convert sorted list to height-balanced BST.', inp: 'Sorted linked list.', out: 'BST level-order.', con: '0≤n≤2×10^4', si: '-10 -3 0 5 9', so: '0 -3 9 -10 null 5', h: [{ i: '', o: '' }, { i: '1 2 3 4 5', o: '3 2 5 1 null 4' }, { i: '1', o: '1' }] },

    // String Easy - Need 1 (to balance if needed)
    { t: 'String', d: 'Easy', n: 'Valid Palindrome', desc: 'Check if string is palindrome (alphanumeric only).', inp: 'String.', out: '"true"/"false".', con: '1≤s≤2×10^5', si: 'A man, a plan, a canal: Panama', so: 'true', h: [{ i: 'race a car', o: 'false' }, { i: ' ', o: 'true' }, { i: '0P', o: 'false' }] }
];

async function addSuperFinal() {
    const c = await pool.connect();
    try {
        console.log('Adding super final 5 problems...\\n');
        let a = 0;
        for (const p of superFinal) {
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
        console.log(`\\n✅ Successfully added ${a} problems!`);
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
addSuperFinal();
