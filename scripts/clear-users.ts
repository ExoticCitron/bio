const { PrismaClient } = require('@prisma/client');
const readline = require('readline');

const prisma = new PrismaClient();

async function clearUsers() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  try {
    console.log('WARNING: This will delete all users from the database.');
    
    const answer : string = await new Promise((resolve) => {
      rl.question('Are you sure you want to proceed? (yes/no): ', resolve);
    });

    if (answer.toLowerCase() !== 'yes') {
      console.log('Operation cancelled.');
      return;
    }

    const { count } = await prisma.user.deleteMany();
    console.log(`Deleted ${count} users from the database.`);

  } catch (error) {
    console.error('Error clearing users:', error);
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

clearUsers().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

