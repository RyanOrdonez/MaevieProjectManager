// Deployment Configuration Script for Maevie Project Manager
// This script verifies and sets up configuration for both Render and Netlify

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Configuration values
const config = {
  // Common
  NODE_ENV: 'production',
  
  // Backend (Render)
  BACKEND_URL: 'https://maevie-backend.onrender.com',
  DATABASE_URL: process.env.DATABASE_URL, // Should come from Render's database connection
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-should-be-long-and-complex',
  PORT: process.env.PORT || 5000,
  
  // Frontend (Netlify)
  FRONTEND_URL: 'https://houseofmaevie.netlify.app',
  REACT_APP_API_URL: 'https://maevie-backend.onrender.com/api',
  
  // Admin user
  ADMIN_EMAIL: 'admin@maevie.com',
  ADMIN_PASSWORD: 'admin123', // Remember to change after first login
  ADMIN_NAME: 'Admin User',
};

// Function to verify and output backend (Render) config
async function verifyRenderConfig() {
  console.log('=== RENDER (BACKEND) CONFIGURATION ===');
  console.log('These settings should be configured in your Render dashboard:');
  console.log(`
Environment Variables:
  NODE_ENV: ${config.NODE_ENV}
  JWT_SECRET: ${config.JWT_SECRET}
  FRONTEND_URL: ${config.FRONTEND_URL}
  DATABASE_URL: [Automatically set by Render database service]
  PORT: ${config.PORT}

Build Command: npm install && npx prisma generate && npx prisma migrate deploy
Start Command: npm start

Services required:
  - Web Service (Node)
  - PostgreSQL Database
  `);
  
  // Check if backend is correctly configured
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Check if admin user exists
    const adminUser = await prisma.user.findUnique({
      where: { email: config.ADMIN_EMAIL }
    });
    
    if (adminUser) {
      console.log(`✅ Admin user found: ${adminUser.email} (${adminUser.role})`);
    } else {
      console.log('❌ Admin user not found! Will be created by setup script during deployment.');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

// Function to verify and output frontend (Netlify) config
function verifyNetlifyConfig() {
  console.log('\n=== NETLIFY (FRONTEND) CONFIGURATION ===');
  console.log('These settings should be configured in your Netlify dashboard:');
  console.log(`
Build Settings:
  Base directory: [Leave blank or set to repository root]
  Build command: cd frontend && npm install && npm run build
  Publish directory: frontend/build

Environment Variables:
  REACT_APP_API_URL: ${config.REACT_APP_API_URL}
  CI: false
  DISABLE_ESLINT_PLUGIN: true
  `);
  
  // Check if frontend environment file exists
  const frontendEnvPath = path.join(__dirname, '..', 'frontend', '.env.production');
  
  if (fs.existsSync(frontendEnvPath)) {
    console.log('✅ Frontend production environment file exists');
    const envContent = fs.readFileSync(frontendEnvPath, 'utf8');
    console.log('Current contents:');
    console.log(envContent);
  } else {
    console.log('❌ Frontend production environment file missing! Creating it...');
    const envContent = `REACT_APP_API_URL=${config.REACT_APP_API_URL}\nCI=false\nDISABLE_ESLINT_PLUGIN=true\n`;
    try {
      fs.writeFileSync(frontendEnvPath, envContent);
      console.log('✅ Created frontend environment file:');
      console.log(envContent);
    } catch (err) {
      console.error('❌ Failed to create environment file:', err.message);
    }
  }
}

// Function to verify CORS configuration
function verifyCorsConfig() {
  console.log('\n=== CORS CONFIGURATION ===');
  
  // Check if server.js has the correct CORS configuration
  const serverJsPath = path.join(__dirname, '..', 'backend', 'server.js');
  
  if (fs.existsSync(serverJsPath)) {
    const serverJs = fs.readFileSync(serverJsPath, 'utf8');
    
    // Simple check if CORS is configured with the correct frontend URL
    if (serverJs.includes(config.FRONTEND_URL)) {
      console.log('✅ CORS configuration includes the correct frontend URL');
    } else {
      console.log('❌ CORS configuration may not include the correct frontend URL!');
      console.log(`Make sure your server.js includes: ${config.FRONTEND_URL}`);
    }
  } else {
    console.error('❌ server.js file not found at expected location!');
  }
}

// Function to export configuration for use in scripts
function exportConfiguration() {
  const configFilePath = path.join(__dirname, 'deployment-settings.json');
  
  try {
    fs.writeFileSync(
      configFilePath, 
      JSON.stringify({
        backend: {
          url: config.BACKEND_URL,
          jwtSecret: "[REDACTED FOR SECURITY]",
          frontendUrl: config.FRONTEND_URL,
          database: "[CONNECTION STRING REDACTED]",
        },
        frontend: {
          url: config.FRONTEND_URL,
          apiUrl: config.REACT_APP_API_URL,
        },
        admin: {
          email: config.ADMIN_EMAIL,
          name: config.ADMIN_NAME,
          password: "[REDACTED FOR SECURITY]",
        }
      }, null, 2)
    );
    console.log('\n✅ Configuration exported to:', configFilePath);
  } catch (err) {
    console.error('❌ Failed to export configuration:', err.message);
  }
}

// Main function
async function deploymentConfig() {
  console.log('MAEVIE PROJECT MANAGER - DEPLOYMENT CONFIGURATION');
  console.log('=================================================');
  
  try {
    await verifyRenderConfig();
    verifyNetlifyConfig();
    verifyCorsConfig();
    exportConfiguration();
    
    console.log('\n=== RENDER.YAML CONFIGURATION ===');
    console.log(`Ensure your render.yaml file contains the correct configuration:`);
    console.log(`
services:
  - type: web
    name: maevie-backend
    env: node
    buildCommand: npm install && npx prisma generate && npx prisma migrate deploy
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: JWT_SECRET
        generateValue: true
      - key: FRONTEND_URL
        value: ${config.FRONTEND_URL}
      - key: DATABASE_URL
        fromDatabase:
          name: maevie-db
          property: connectionString

databases:
  - name: maevie-db
    plan: free
    databaseName: maevie
    user: maevie_user
`);

    console.log('\n=== NETLIFY.TOML CONFIGURATION ===');
    console.log(`Consider adding a netlify.toml file in your repository root with:`);
    console.log(`
[build]
  base = ""
  command = "cd frontend && npm install && npm run build"
  publish = "frontend/build"

[build.environment]
  REACT_APP_API_URL = "${config.REACT_APP_API_URL}"
  CI = "false"
  DISABLE_ESLINT_PLUGIN = "true"
`);
    
    console.log('\n=== DEPLOYMENT CHECKLIST ===');
    console.log(`
1. Push your code to GitHub
2. Connect your GitHub repository to Render and Netlify
3. Configure environment variables in both platforms as listed above
4. Deploy backend first, then frontend
5. Verify the admin user is created via logs
6. Test login functionality
7. Set up automatic deployments for future updates
`);

  } catch (error) {
    console.error('Error during configuration verification:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the configuration verification
deploymentConfig();
