import * as ContentRepo from '../repos/content.repo.js';

export const createContent = async ({
  userId,
  title,
  description,
  contentType,
  metaData,
  status = 'draft',
}) => {
  try {
    // Additional validation
    if (!userId) {
      throw new Error('User ID is required');
    }

    // Sanitize and validate content type
    const validContentTypes = ['ARTICLE', 'VIDEO', 'IMAGE'];
    const normalizedContentType = contentType.toUpperCase();
    if (!validContentTypes.includes(normalizedContentType)) {
      throw new Error(`Invalid content type. Must be one of: ${validContentTypes.join(', ')}`);
    }

    // Validate metadata
    if (!metaData) {
      throw new Error('Metadata is required');
    }

    // Prepare content data with proper formatting
    const contentData = {
      authorId: userId,
      title: title.trim(),
      description: description.trim(),
      contentType: normalizedContentType,
      metadata: metaData, // Changed from meta_data to metadata to match schema
      status: status.toUpperCase() === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT',
      // Remove created_at and updated_at as Prisma handles these automatically
    };

    const newContent = await ContentRepo.createContent(contentData);
    return newContent;
  } catch (error) {
    console.error('Service Error - Create Content:', error);
    throw error;
  }
};

export const getAllContents = async () => {
  try {
    const contents = await ContentRepo.getAllContents();
    return contents;
  } catch (error) {
    console.error('Service Error - Get All Contents:', error);
    throw error;
  }
};

export const updateContent = async (id, updateData) => {
  try {
    // Validate content ID
    if (!id) {
      throw new Error('Content ID is required');
    }

    // If contentType is being updated, validate it
    if (updateData.contentType) {
      const validContentTypes = ['ARTICLE', 'VIDEO', 'IMAGE'];
      const normalizedContentType = updateData.contentType.toUpperCase();
      if (!validContentTypes.includes(normalizedContentType)) {
        throw new Error(`Invalid content type. Must be one of: ${validContentTypes.join(', ')}`);
      }
      updateData.contentType = normalizedContentType;
    }

    // If status is being updated, validate it
    if (updateData.status) {
      updateData.status = updateData.status.toUpperCase() === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT';
    }

    const updatedContent = await ContentRepo.updateContent(id, updateData);
    return updatedContent;
  } catch (error) {
    console.error('Service Error - Update Content:', error);
    throw error;
  }
};

//delete the content

export const deleteContent = async (id) => {
  try {
    if (!id) {
      throw new Error('Content ID is required');
    }
    const deletedContent = await ContentRepo.deleteContent(id);
    return deletedContent;
  } catch (error) {
    console.error('Service Error - Delete Content:', error);
    throw error;
  }
};

export default { createContent, getAllContents, updateContent, deleteContent };
