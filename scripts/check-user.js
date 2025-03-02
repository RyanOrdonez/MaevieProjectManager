// Check if admin user exists in the database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUser() {
  try {
    console.log('Checking for admin user...');
    
    // Define admin credentials
    const adminEmail = 'admin@maevie.com';
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (user) {
      console.log(`Found user with email ${adminEmail}:`);
      console.log(`ID: ${user.id}`);
      console.log(`Name: ${user.name}`);
      console.log(`Role: ${user.role}`);
      console.log(`Password hash length: ${user.password.length}`);
      
      // Check hash format
      if (user.password.startsWith('$2')) {
        console.log('Password appears to be correctly hashed with bcrypt');
      } else {
        console.log('WARNING: Password does not appear to be hashed with bcrypt');
      }
    } else {
      console.log(`No user found with email ${adminEmail}`);
    }
    
  } catch (error) {
    console.error('Error checking user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the check
checkUser();
