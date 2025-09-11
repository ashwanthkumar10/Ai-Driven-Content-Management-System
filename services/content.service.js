import * as ContentRepo from "../repos/content.repo.js";

export const createContent = async ({ userId, title, description, contentType, metaData, status = 'draft' }) => {
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
            status: status.toUpperCase() === 'PUBLISHED' ? 'PUBLISHED' : 'DRAFT'
            // Remove created_at and updated_at as Prisma handles these automatically
        };

        const newContent = await ContentRepo.createContent(contentData);
        return newContent;
    } catch (error) {
        console.error('Service Error - Create Content:', error);
        throw error;
    }
}


export const getAllContents = async () => {
    try{
        const contents = await ContentRepo.getAllContents();
        return contents;
    }
    catch(error){
        console.error('Service Error - Get All Contents:', error);
        throw error;
    }
}

export default { createContent };