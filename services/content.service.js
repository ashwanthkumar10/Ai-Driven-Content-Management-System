import * as ContentRepo from "../repos/content.repo.js";

export const createContent = async ({ userId, title, description, contentType, metaData, status = 'draft' }) => {
    try {
        // Additional validation
        if (!userId) {
            throw new Error('User ID is required');
        }

        // Sanitize and validate content type
        const validContentTypes = ['ARTICLE', 'VIDEO', 'IMAGE', ];
        if (!validContentTypes.includes(contentType.toLowerCase())) {
            throw new Error('Invalid content type');
        }

        // Prepare content data with proper formatting
        const contentData = {   
            user_id: userId,
            title: title.trim(),
            description: description.trim(),
            content_type: contentType.toLowerCase(),
            meta_data: metaData || {},
            status: status.toLowerCase(),
            created_at: new Date(),
            updated_at: new Date()
        };

        const newContent = await ContentRepo.createContent(contentData);
        return newContent;
    } catch (error) {
        console.error('Service Error - Create Content:', error);
        throw error;
    }
}


export default { createContent };