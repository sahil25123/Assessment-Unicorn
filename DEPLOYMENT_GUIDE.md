# Deployment Guide - Task Management System

This guide provides step-by-step instructions for deploying the Task Management System to production.

## Overview

- **Backend**: Deploy to Render or Railway
- **Frontend**: Deploy to Vercel
- **Database**: MongoDB Atlas

## Prerequisites

- GitHub account (for code hosting)
- MongoDB Atlas account (free tier available)
- Render/Railway account (for backend)
- Vercel account (for frontend)

---

## Part 1: MongoDB Atlas Setup

### 1. Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (free M0 tier)

### 2. Configure Database Access

1. Go to **Database Access** in the left sidebar
2. Click **Add New Database User**
3. Create a user with username and password
4. Save the credentials securely
5. Set privileges to **Read and write to any database**

### 3. Configure Network Access

1. Go to **Network Access** in the left sidebar
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Click **Confirm**

### 4. Get Connection String

1. Go to **Databases** and click **Connect**
2. Select **Connect your application**
3. Copy the connection string
4. It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<username>` and `<password>` with your credentials
6. Add database name: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority`

---

## Part 2: Backend Deployment (Render)

### 1. Prepare Your Code

1. Ensure your code is pushed to GitHub
2. Create a `.env.example` file if not already present
3. Make sure `server.js` uses `process.env.PORT`

### 2. Deploy to Render

1. Go to [Render](https://render.com)
2. Sign up and log in
3. Click **New +** → **Web Service**
4. Connect your GitHub repository
5. Select the backend directory (if using monorepo, set Root Directory to `backend`)

### 3. Configure Build Settings

- **Name**: task-management-backend
- **Region**: Choose closest to your users
- **Branch**: main (or your default branch)
- **Root Directory**: `backend` (if applicable)
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Configure Environment Variables

Add the following environment variables in Render:

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/taskmanagement?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.vercel.app
```

⚠️ **Important**:

- Use a strong, unique JWT_SECRET (at least 32 characters)
- Update CLIENT_URL after deploying the frontend

### 5. Deploy

1. Click **Create Web Service**
2. Wait for deployment to complete
3. Your backend will be live at: `https://your-app-name.onrender.com`
4. Test the health endpoint: `https://your-app-name.onrender.com/`

### Alternative: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Sign up and log in
3. Click **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. Railway will auto-detect Node.js
6. Add environment variables in the **Variables** tab
7. Deploy and get your backend URL

---

## Part 3: Frontend Deployment (Vercel)

### 1. Update Frontend Configuration

Update `.env` in frontend:

```env
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

### 2. Deploy to Vercel

#### Option 1: Using Vercel CLI

1. Install Vercel CLI:

```bash
npm install -g vercel
```

2. Navigate to frontend directory:

```bash
cd frontend
```

3. Deploy:

```bash
vercel
```

4. Follow the prompts and deploy to production:

```bash
vercel --prod
```

#### Option 2: Using Vercel Dashboard

1. Go to [Vercel](https://vercel.com)
2. Sign up and log in
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` (if applicable)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

6. Add Environment Variables:
   - Key: `REACT_APP_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`

7. Click **Deploy**

### 3. Update Backend CORS

After frontend deployment, update the `CLIENT_URL` environment variable in Render:

```
CLIENT_URL=https://your-app-name.vercel.app
```

---

## Part 4: Post-Deployment Configuration

### 1. Create Initial Users

Use Postman or any API client to create initial users:

**POST** `https://your-backend-url.onrender.com/api/auth/register`

**Admin User:**

```json
{
  "name": "Admin User",
  "email": "admin@yourcompany.com",
  "password": "SecurePassword123!",
  "role": "admin"
}
```

**Employee User:**

```json
{
  "name": "Employee User",
  "email": "employee@yourcompany.com",
  "password": "SecurePassword123!",
  "role": "employee"
}
```

### 2. Test the Application

1. Visit your Vercel URL: `https://your-app-name.vercel.app`
2. Test login with created credentials
3. Test admin features (create tasks)
4. Test employee features (update task status)

---

## Part 5: Custom Domain (Optional)

### Frontend (Vercel)

1. Go to your project in Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed by Vercel

### Backend (Render)

1. Go to your service in Render
2. Click **Settings** → **Custom Domain**
3. Add your custom domain
4. Update DNS records as instructed by Render

---

## Environment Variables Summary

### Backend (Render/Railway)

```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secure_secret_key
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.vercel.app
```

### Frontend (Vercel)

```
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## Troubleshooting

### Backend Issues

1. **500 Server Error**
   - Check Render logs
   - Verify MongoDB connection string
   - Ensure all environment variables are set

2. **Database Connection Failed**
   - Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
   - Check database credentials
   - Ensure database user has proper permissions

3. **CORS Errors**
   - Verify CLIENT_URL in backend environment variables
   - Ensure it matches your Vercel frontend URL

### Frontend Issues

1. **API Connection Failed**
   - Verify REACT_APP_API_URL is correct
   - Check if backend is running
   - Test backend endpoints directly

2. **Build Failed**
   - Check for syntax errors
   - Ensure all dependencies are in package.json
   - Review Vercel build logs

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Using strong JWT_SECRET (min 32 characters)
- [ ] MongoDB IP whitelist configured
- [ ] HTTPS enabled (automatic with Render/Vercel)
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] Production NODE_ENV set

---

## Monitoring & Maintenance

### Render

- Monitor logs in the Render dashboard
- Set up health checks
- Enable auto-deploy on GitHub push

### Vercel

- Monitor deployments in Vercel dashboard
- Review analytics
- Enable automatic deployments

### MongoDB Atlas

- Monitor database usage
- Set up alerts for high usage
- Regular backups (automatic in Atlas)

---

## Estimated Costs

- **MongoDB Atlas**: Free (M0 tier)
- **Render**: Free tier available (with limitations)
- **Vercel**: Free for hobby projects

**Note**: Free tiers have limitations. Upgrade to paid plans for production use with:

- Higher traffic
- Better performance
- SLA guarantees
- Advanced features

---

## Next Steps

1. Set up monitoring and error tracking (e.g., Sentry)
2. Implement email notifications
3. Add analytics
4. Set up CI/CD pipelines
5. Create backup and recovery procedures

---

## Support

For deployment issues:

- Render: https://render.com/docs
- Vercel: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com/

---

**Congratulations!** Your Task Management System is now deployed and ready for production use! 🎉
