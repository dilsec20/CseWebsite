# Mock Data Backend - Quick Start

## What's Changed
The backend now works WITHOUT PostgreSQL database! All data is stored in memory using `mockData.js`.

## Features Available
✅ **500+ DSA Problems** - Organized by topics and difficulty  
✅ **Authentication** - Register and login (data persists while server runs)  
✅ **Code Execution** - Run and submit code solutions  
✅ **Quiz System** - CS fundamentals quizzes  
✅ **Contests** - Timed coding contests  

## How to Use

### 1. Start the Server
From the root of your project:
```bash
npm start
```

This starts both frontend (port 5173) and backend (port 5000).

### 2. Access the Application
Open your browser to: `http://localhost:5173`

### 3. Create an Account
1. Click "Get Started" or navigate to Register
2. Sign up with any email/password
3. Login with your credentials

### 4. Explore Features
- **Problems**: Browse 500+ DSA problems filtered by topic/difficulty
- **Knowledge Base**: Take CS fundamentals quizzes  
- **Contests**: Start a 2-hour timed contest

## Important Notes

⚠️ **Data is NOT persistent** - All data (users, submissions, scores) is lost when you restart the server. This is because we're using in-memory storage instead of a database.

⚠️ **Single user limitation** - Each server restart clears all users. You'll need to register again.

## Future: Add PostgreSQL
When you're ready to persist data:
1. Install PostgreSQL
2. Create database using `database.sql`
3. Update routes to use `pool` instead of `mockData`
4. Add `.env` file with database credentials

## Troubleshooting

**White screen?**
- Check browser console for errors
- Ensure both frontend and backend are running
- Refresh the page

**Problems not loading?**
- Backend server must be running on port 5000
- Check `http://localhost:5000/api/problems` directly

**Can't login/register?**
- Backend must be running
- Check browser console for errors
- Try clearing localStorage and cookies
