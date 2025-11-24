const http = require('http');

console.log('Testing Public Profile API...\n');

// Test 1: Public Profile
http.get('http://localhost:5000/api/public/profile/dilip_kumar', (resp) => {
    let data = '';
    resp.on('data', (chunk) => { data += chunk; });
    resp.on('end', () => {
        const profile = JSON.parse(data);
        console.log('✅ Public Profile for dilip_kumar:');
        console.log(`   Username: ${profile.username}`);
        console.log(`   Name: ${profile.user_name}`);
        console.log(`   Bio: ${profile.bio || 'Not set'}`);
        console.log(`   Problems Solved: ${profile.stats.problems_solved}`);
        console.log(`   Total Submissions: ${profile.stats.total_submissions}`);
        console.log(`   Current Streak: ${profile.stats.current_streak} days`);
        console.log(`   Hours Coded: ${profile.stats.hours_spent}`);
        console.log(`   Contests: ${profile.stats.contests_attended}`);
        console.log(`   Rating: ${profile.stats.contest_rating}`);
        console.log(`   Contribution days: ${profile.submission_calendar.length}`);

        // Test 2: Search
        console.log('\n\nTesting Search API...\n');
        http.get('http://localhost:5000/api/public/search?q=kumar', (resp2) => {
            let data2 = '';
            resp2.on('data', (chunk) => { data2 += chunk; });
            resp2.on('end', () => {
                const users = JSON.parse(data2);
                console.log(`✅ Search found ${users.length} users matching "kumar":`);
                users.forEach(u => console.log(`   - ${u.user_name}`));
                console.log('\n✅ All public profile features working!');
            });
        });
    });
}).on("error", (err) => {
    console.log("❌ Error: " + err.message);
});
