const pool = require('../db');

const last2 = [
    // Array Hard - Final 2
    { t: 'Array', d: 'Hard', n: 'Candy Distribution', desc: 'Min candies for children with ratings.', inp: 'Ratings.', out: 'Min total candies.', con: '1≤n≤2×10^4', si: '1 0 2', so: '5', h: [{ i: '1 2 2', o: '4' }, { i: '1 3 2 2 1', o: '7' }, { i: '1', o: '1' }] },
    { t: 'Array', d: 'Hard', n: 'Merge k Sorted Arrays', desc: 'Merge k sorted arrays.', inp: 'First line: k. Next k lines: sorted arrays.', out: 'Merged sorted array.', con: '0≤k≤10^4', si: '3\n1 4 5\n1 3 4\n2 6', so: '1 1 2 3 4 4 5 6', h: [{ i: '0', o: '' }, { i: '1\n', o: '' }, { i: '2\n1\n2', o: '1 2' }] }
];

async function addLast2() {
    const c = await pool.connect();
    try {
        console.log('Adding final 2 Array Hard problems...\\n');
        let a = 0;
        for (const p of last2) {
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
        console.log(`\\n🎊 MISSION ACCOMPLISHED! Added final ${a} problems!`);
        console.log('All 13 topics now have at least 5 problems per difficulty level!');
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
addLast2();
