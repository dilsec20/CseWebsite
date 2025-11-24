const fs = require('fs');
const path = require('path');

const dumpPath = path.join(__dirname, 'test_cases_dump_mapped.json');
const data = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
console.log(`Length of array in JSON file: ${data.length}`);
