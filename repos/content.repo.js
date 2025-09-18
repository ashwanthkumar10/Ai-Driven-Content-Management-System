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
            email: true,
          },
        },
      },
    });
    return newContent;
  } catch (error) {
    console.error('Repository Error - Create Content:', error);
    throw error;
  }
};

export const getAllContents = async () => {
  try {
    const contents = await prisma.content.findMany({});

    return contents;
  } catch (error) {
    console.error('Repository Error - Get All Contents:', error);
    throw error;
  }
};

export const updateContent = async (id, updateData) => {
  try {
    const updatedContent = await prisma.content.update({
      where: { id },
      data: updateData,
    });
    return updatedContent;
  } catch (error) {
    console.error('Repository Error - Update Content:', error);
    throw error;
  }
};

export const deleteContent = async (id) => {
  try {
    const deletedContent = await prisma.content.delete({
      where: { id },
    });
    return deletedContent;
  } catch (error) {
    console.error('Repository Error - Delete Content:', error);
    throw error;
  }
};
