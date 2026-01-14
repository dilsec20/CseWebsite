const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

async function createBlogPostsTable() {
    try {
        console.log('🔗 Connecting to database...');

        // Create new blog_posts table for /blog feature
        await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        post_id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        title VARCHAR(500) NOT NULL,
        content TEXT NOT NULL,
        views INT DEFAULT 0,
        likes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('✅ Created blog_posts table');

        // Create upvotes table for blog posts
        await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_post_upvotes (
        upvote_id SERIAL PRIMARY KEY,
        post_id INT REFERENCES blog_posts(post_id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(post_id, user_id)
      );
    `);
        console.log('✅ Created blog_post_upvotes table');

        // Create comments table for blog posts
        await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_post_comments (
        comment_id SERIAL PRIMARY KEY,
        post_id INT REFERENCES blog_posts(post_id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
        console.log('✅ Created blog_post_comments table');

        // Check existing blogs table
        const blogsCheck = await pool.query('SELECT COUNT(*) FROM blogs');
        console.log('📊 Existing discussions in blogs table:', blogsCheck.rows[0].count);

        console.log('');
        console.log('🎉 SUCCESS! Tables created:');
        console.log('   - blog_posts (for /blog page)');
        console.log('   - blog_post_upvotes');
        console.log('   - blog_post_comments');
        console.log('   - blogs (unchanged - for Dashboard discussions)');

        await pool.end();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await pool.end();
    }
}

createBlogPostsTable();
