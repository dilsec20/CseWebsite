const pool = require('../db');

const finalThree = [
    // Array Hard - Need 2
    { t: 'Array', d: 'Hard', n: 'Maximal Rectangle', desc: 'Find maximal rectangle in binary matrix.', inp: 'First line: rows cols. Next rows: binary strings.', out: 'Max rectangle area.', con: '1≤rows,cols≤200', si: '4 5\n10100\n10111\n11111\n10010', so: '6', h: [{ i: '1 1\n0', o: '0' }, { i: '1 1\n1', o: '1' }, { i: '2 2\n11\n11', o: '4' }] },
    { t: 'Array', d: 'Hard', n: 'Sliding Window Maximum', desc: 'Max in each sliding window.', inp: 'First line: n k. Second line: array.', out: 'Window maxima.', con: '1≤k≤n≤10^5', si: '8 3\n1 3 -1 -3 5 3 6 7', so: '3 3 5 5 6 7', h: [{ i: '1 1\n1', o: '1' }, { i: '3 2\n1 2 3', o: '2 3' }, { i: '9 3\n1 3 -1 -3 5 3 6 7 10', o: '3 3 5 5 6 7 10' }] },

    // String Hard - Need 1
    { t: 'String', d: 'Hard', n: 'Scramble String', desc: 'Check if s2 is scrambled version of s1.', inp: 'String s1. String s2.', out: '"true"/"false".', con: '1≤s1,s2≤30', si: 'great\nrgeat', so: 'true', h: [{ i: 'abcde\ncaebd', o: 'false' }, { i: 'a\na', o: 'true' }, { i: 'abc\nacb', o: 'true' }] }
];

async function addFinalThree() {
    const c = await pool.connect();
    try {
        console.log('Adding final 3 problems to complete requirements...\\n');
        let a = 0;
        for (const p of finalThree) {
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
        console.log(`\\n🎉 COMPLETE! Added all ${a} final problems!`);
    } catch (err) { console.error(err); throw err; }
    finally { c.release(); await pool.end(); }
}
addFinalThree();
