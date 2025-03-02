const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function addAdminUser() {
  try {
    // Define admin credentials
    const adminEmail = 'admin@maevie.com';
    const adminPassword = 'admin123'; // You should change this after creation
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
      
      return;
    }

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
    console.log(`Password is: ${adminPassword} (change this immediately after first login)`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addAdminUser();
