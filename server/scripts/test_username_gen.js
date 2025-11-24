const assert = require('assert');

function generateUsername(name) {
    if (!name) return 'user';
    return name
        .toLowerCase()
        .replace(/\s+/g, '_')           // Replace spaces with underscores
        .replace(/[^a-z0-9_]/g, '');    // Remove any character that's not alphanumeric or underscore
}

console.log('🧪 Testing Username Generation Logic...');

const tests = [
    { input: 'John Doe', expected: 'john_doe' },
    { input: 'User Name 123', expected: 'user_name_123' },
    { input: 'Hello! World@', expected: 'hello_world' },
    { input: '  Spaces  ', expected: '_spaces_' }, // Note: regex replaces sequence of spaces with one underscore
    { input: 'Simple', expected: 'simple' },
    { input: '12345', expected: '12345' }
];

let passed = 0;
for (const t of tests) {
    const result = generateUsername(t.input);
    if (result === t.expected) {
        console.log(`✅ "${t.input}" -> "${result}"`);
        passed++;
    } else {
        console.log(`❌ "${t.input}" -> "${result}" (Expected: "${t.expected}")`);
    }
}

if (passed === tests.length) {
    console.log('\n✨ All username tests passed!');
} else {
    console.log('\n⚠️ Some tests failed.');
}
