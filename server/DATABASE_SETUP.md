# Database Setup Guide

## Prerequisites
- PostgreSQL installed on your system
- Node.js and npm installed

## Step-by-Step Setup

### 1. Create PostgreSQL Database

Open your PostgreSQL command line or pgAdmin and run:
```sql
CREATE DATABASE placement_prep;
```

### 2. Configure Environment Variables

Copy the example file and fill in your details:
```bash
cd server
copy .env.example .env
```

Edit `.env` file with your actual PostgreSQL credentials:
```env
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_HOST=localhost
DB_PORT=5432
DB_NAME=placement_prep
JWT_SECRET=generate_a_random_secret_key_here
PORT=5000
```

### 3. Run Database Schema

Execute the schema file to create all tables:
```bash
psql -U postgres -d placement_prep -f database.sql
```

Or using pgAdmin:
1. Connect to `placement_prep` database
2. Open Query Tool
3. Load and execute `database.sql`

### 4. Seed Problems

Generate and seed 500+ problems:
```bash
cd server
node scripts/generateProblems.js
psql -U postgres -d placement_prep -f scripts/problems_seed.sql
```

### 5. Verify Setup

Check if problems were inserted:
```sql
SELECT COUNT(*) FROM problems;
SELECT topic, difficulty, COUNT(*) FROM problems GROUP BY topic, difficulty;
```

### 6. Start the Server

```bash
cd server
npm install
npm run dev
```

The server should now be running on `http://localhost:5000`

### 7. Test Authentication

Try registering a new user from the frontend:
1. Go to `http://localhost:5173/register`
2. Fill in the registration form
3. After successful registration, try logging in

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check `.env` credentials match your PostgreSQL setup
- Ensure the database `placement_prep` exists

### Problems Not Loading
- Verify problems were seeded: `SELECT COUNT(*) FROM problems;`
- Check server logs for errors
- Ensure backend server is running on port 5000

### Authentication Not Working
- Verify `users` table exists
- Check JWT_SECRET is set in `.env`
- Clear browser localStorage and try again
