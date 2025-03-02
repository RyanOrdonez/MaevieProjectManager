// This script sets up the database with initial migrations and admin user
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function setupDatabase() {
  try {
    console.log('Setting up the database...');
    
    // Define admin credentials
    const adminEmail = 'admin@maevie.com';
    const adminPassword = 'admin123'; // Change this after first login
    const adminName = 'Admin User';
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingUser) {
      console.log(`User with email ${adminEmail} already exists with role ${existingUser.role}`);
      
      // Update role to ADMIN if not already
      if (existingUser.role !== 'ADMIN') {
        await prisma.user.update({
          where: { id: existingUser.id },
          data: { role: 'ADMIN' },
        });
        console.log(`Updated user role to ADMIN`);
      }
      
      // Update password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword },
      });
      console.log(`Updated password for ${adminEmail}`);
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

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
    }
    
    console.log(`Admin login credentials: 
    Email: ${adminEmail}
    Password: ${adminPassword}
    (Please change this password after first login)`);
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
setupDatabase();
