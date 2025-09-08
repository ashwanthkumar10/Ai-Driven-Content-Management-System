import * as ContentService from "../services/content.service.js";

export const createContent = async (req, res) => {
    try {
        const userId = req.user.id; // Fixed userId extraction
        const { title, description, contentType, metaData, status } = req.body;
        console.log("user Id is ",userId);
        
        // Validate required fields
        if (!title || !description) {
            return res.status(400).json({ 
                success: false,
                message: "Title and description are required" 
            });
        }

        // Validate content type
        if (!contentType) {
            return res.status(400).json({ 
                success: false,
                message: "Content type is required" 
            });
        }

        const newContent = await ContentService.createContent({ 
            userId, 
            title, 
            description, 
            contentType, 
            metaData, 
            status: status || 'draft' // Default status if not provided
        });

        return res.status(201).json({
            success: true,
            data: newContent
        });
    } catch (error) {
        console.error('Error creating content:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export default { createContent };