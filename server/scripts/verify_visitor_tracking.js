const pool = require('../db');

const verifyTracking = async () => {
    try {
        console.log('🧪 Verifying Visitor Tracking...');

        // 1. Insert a test record
        const testIp = '127.0.0.1';
        const testUa = 'TestAgent/1.0';
        const testUrl = '/test-verification';

        await pool.query(
            "INSERT INTO visitor_logs (ip_address, user_agent, page_url) VALUES ($1, $2, $3)",
            [testIp, testUa, testUrl]
        );
        console.log('✅ Inserted test visit record.');

        // 2. Query stats (Logic from admin.js)
        const totalVisits = await pool.query("SELECT COUNT(*) FROM visitor_logs");
        const visitsToday = await pool.query("SELECT COUNT(*) FROM visitor_logs WHERE visit_time::date = CURRENT_DATE");
        const uniqueVisitors = await pool.query("SELECT COUNT(DISTINCT ip_address) FROM visitor_logs WHERE visit_time::date = CURRENT_DATE");

        console.log('📊 Current Stats:');
        console.log(`   - Total Visits: ${totalVisits.rows[0].count}`);
        console.log(`   - Visits Today: ${visitsToday.rows[0].count}`);
        console.log(`   - Unique Visitors Today: ${uniqueVisitors.rows[0].count}`);

        if (parseInt(totalVisits.rows[0].count) > 0) {
            console.log('✅ Verification Successful: Stats are being tracked and queried.');
        } else {
            console.error('❌ Verification Failed: No visits found after insertion.');
        }

    } catch (err) {
        console.error('❌ Verification Error:', err.message);
    } finally {
        pool.end();
    }
};

verifyTracking();
