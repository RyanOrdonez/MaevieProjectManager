# Maevie

## Overview
Maevie is a web app for interior design companies, offering design file management, client collaboration, and project tracking. It features a minimalist UI with soft blush tones and Lora font.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Redux
- **Backend**: Node.js, Express.js, PostgreSQL, Prisma
- **Authentication**: JWT
- **Hosting**: Vercel (Frontend), AWS (Backend)

## Features
1. **Design File Management**
   - Upload and organize design files
   - Folder structure for categorization
   - File preview capabilities

2. **Client Portal**
   - Project boards for visualization
   - Contract management
   - Questionnaire submissions
   - Invoice tracking
   - Client-designer communication

3. **User Roles**
   - Admin: Full system access
   - Designer: Project creation and management
   - Client: Limited view of their projects

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm or yarn

### Backend Setup
1. Install dependencies:
   ```
   cd InteriorDesignProjectManager
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update the database connection URL
   - Set a strong JWT_SECRET

3. Set up the database:
   ```
   npx prisma migrate dev --name init
   ```

4. Start the server:
   ```
   npm run server
   ```

### Frontend Setup
1. Install dependencies:
   ```
   cd frontend
   npm install
   ```

2. Start the React app:
   ```
   npm start
   ```

## Development Workflow
1. The backend runs on http://localhost:5000
2. The frontend runs on http://localhost:3000
3. API endpoints are available at http://localhost:5000/api

## Deployment

### Frontend Deployment to Netlify
1. Push your repository to GitHub
2. Login to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/build`
6. Click "Deploy site"
7. Set environment variables in Netlify (Settings > Build & deploy > Environment):
   - `REACT_APP_API_URL`: Your backend API URL

### Backend Deployment Options
1. **Render**:
   - Push your repository to GitHub
   - Create a new Web Service on [Render](https://render.com/)
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `node server.js`
   - Add environment variables (DATABASE_URL, JWT_SECRET)

2. **Heroku**:
   - Install Heroku CLI
   - Run: `heroku create maevie-api`
   - Run: `git push heroku main`
   - Set environment variables with: `heroku config:set KEY=VALUE`

## Future Enhancements (Version 2)
1. Subscription-based payment model
2. Advanced file collaboration features
3. Calendar integration
4. Mobile app version

## Contributors
- Ryan Ordonez (Project Lead)

## License
This project is proprietary and confidential.
