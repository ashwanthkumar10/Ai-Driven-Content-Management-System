import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createContent = async (contentData) => {
    try {
        const newContent = await prisma.content.create({
            data: contentData,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        email: true
                    }
                }
            }
        });
        return newContent;
    } catch (error) {
        console.error('Repository Error - Create Content:', error);
        throw error;
    }
}