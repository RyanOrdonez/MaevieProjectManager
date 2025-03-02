// This script creates an admin user directly using the API
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function forceCreateAdmin() {
  try {
    console.log('Force creating admin user...');
    
    // Define admin credentials
    const adminEmail = 'admin@maevie.com';
    const adminPassword = 'admin123'; // Change this after login
    const adminName = 'Admin User';
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    // Delete existing user if found (this is for troubleshooting)
    if (existingUser) {
      console.log(`Deleting existing user with email ${adminEmail}`);
      await prisma.user.delete({
        where: { id: existingUser.id },
      });
      console.log('User deleted successfully');
    }
    
    // Hash password - using a simpler approach with a fixed salt for troubleshooting
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);
    
    console.log('Creating new admin user...');
    // Create admin user
    const user = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    console.log(`Created admin user: ${user.email} with role ${user.role}`);
    console.log('Password hash:', hashedPassword);
    
    console.log(`
=== ADMIN LOGIN CREDENTIALS ===
Email: ${adminEmail}
Password: ${adminPassword}
Please change this password after first login
    `);
    
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
forceCreateAdmin();
