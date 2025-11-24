const axios = require('axios');

async function debugCompilation() {
    try {
        console.log('🔍 Debugging Compilation Error...\n');

        const code = `#include <bits/stdc++.h>
using namespace std;

int main() {
    string s;
    cin>>s;
    
    reverse(s.begin(), s.end());
    cout<<s;
    
    return 0;
}`;

        console.log('Sending code to Piston API...');

        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
            language: "cpp",
            version: "10.2.0", // Trying specific version, or "*"
            files: [{ content: code }],
            stdin: "hello",
            compile_timeout: 10000,
            run_timeout: 3000
        });

        console.log('\n--- Piston Response ---');
        console.log(JSON.stringify(response.data, null, 2));

        if (response.data.compile && response.data.compile.code !== 0) {
            console.log('\n❌ Compilation Failed!');
            console.log('Stderr:', response.data.compile.stderr);
            console.log('Stdout:', response.data.compile.stdout);
        } else {
            console.log('\n✅ Compilation Success!');
            console.log('Output:', response.data.run.stdout);
        }

    } catch (err) {
        console.error('Error:', err.message);
        if (err.response) {
            console.error('Response data:', err.response.data);
        }
    }
}

debugCompilation();
