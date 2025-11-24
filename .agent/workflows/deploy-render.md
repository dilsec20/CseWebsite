---
description: Deploy the application to Render (PostgreSQL + Backend + Frontend)
---

# Deploy to Render

This workflow guides you through deploying your full-stack application to Render.

## Prerequisites

- GitHub repository with your code pushed
- Render account (sign up at https://render.com)
- Your application code ready for deployment

## Step 1: Deploy PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `placement-prep-db`
   - **Database**: `placement_prep`
   - **Region**: Choose closest region
   - **Plan**: Free (for testing) or paid (for production)
4. Click **"Create Database"**
5. **Save the Internal Database URL** from the dashboard

// turbo
6. Initialize your database schema (if you have a schema.sql file):
```bash
psql <INTERNAL_DATABASE_URL> < server/schema.sql
```

## Step 2: Deploy Backend Web Service

1. In Render Dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `dilsec20/CseWebsite`
3. Configure:
   - **Name**: `placement-prep-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free or paid

4. Add Environment Variables:
   - `DATABASE_URL` = `<Your Internal Database URL from Step 1>`
   - `JWT_SECRET` = `<Generate a secure random string>`
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://placement-prep-frontend.onrender.com` (will update after frontend deployment)

5. Click **"Create Web Service"**
6. Wait for deployment to complete
7. **Save your backend URL**: e.g., `https://placement-prep-backend.onrender.com`

8. Test the backend:
```bash
curl https://placement-prep-backend.onrender.com/api/health
```

## Step 3: Deploy Frontend Static Site

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Connect the same repository: `dilsec20/CseWebsite`
3. Configure:
   - **Name**: `placement-prep-frontend`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. Add Environment Variables:
   - `VITE_API_URL` = `<Your backend URL from Step 2>`

5. Click **"Create Static Site"**
6. Wait for deployment to complete
7. **Save your frontend URL**: e.g., `https://placement-prep-frontend.onrender.com`

## Step 4: Update Backend CORS

1. Go back to your backend service in Render
2. Update the `FRONTEND_URL` environment variable with your actual frontend URL
3. Click **"Save Changes"** (this will trigger a redeploy)

## Step 5: Verify Deployment

1. Visit your frontend URL
2. Test user registration/login
3. Test all features:
   - Problems page
   - Code execution
   - Quizzes
   - Contests
   - Profile page

## Troubleshooting

### Database connection errors
- Ensure you're using the **Internal Database URL** (not External)
- Check that SSL is configured in `db.js`

### CORS errors
- Verify `FRONTEND_URL` is set correctly in backend env vars
- Check browser console for exact error
- Ensure backend has been redeployed after adding FRONTEND_URL

### Frontend can't reach backend
- Verify `VITE_API_URL` is set correctly in frontend env vars
- Test backend health endpoint: `curl <BACKEND_URL>/api/health`
- Check that backend is running (not in error state)

### Environment variables not working
- Variable names are case-sensitive
- Frontend variables must start with `VITE_`
- Trigger manual redeploy after adding/changing variables

## Post-Deployment

- [ ] Test all application features
- [ ] Set up custom domain (optional)
- [ ] Enable auto-deploy on git push
- [ ] Monitor logs for errors
- [ ] Consider upgrading from free tier for production use

## Important URLs

After deployment, save these:
- Frontend: `https://placement-prep-frontend.onrender.com`
- Backend: `https://placement-prep-backend.onrender.com`
- Database: Access via Render dashboard
- Health Check: `https://placement-prep-backend.onrender.com/api/health`
