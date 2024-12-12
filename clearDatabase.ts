import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        // Delete all users
        await prisma.user.deleteMany({});
        // Add more deleteMany calls for other models as needed
        console.log('All data cleared from the database.');
    } catch (error) {
        console.error('Error clearing database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
