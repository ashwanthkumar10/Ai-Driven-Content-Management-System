import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createContent = async (contentData) => {
    try {
        const newContent = await prisma.content.create({
            data: contentData,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
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

export const getAllContents = async () => {
    try {
        const contents = await prisma.content.findMany({});
        
        return contents;
    }

     catch (error) {
        console.error('Repository Error - Get All Contents:', error);
        throw error;
    }
}