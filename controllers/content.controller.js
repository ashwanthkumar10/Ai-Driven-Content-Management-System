import * as ContentService from '../services/content.service.js';

export const createContent = async (req, res) => {
  try {
    const userId = req.user.id; // Fixed userId extraction
    const { title, description, contentType, metaData, status } = req.body;
    console.log('user Id is ', userId);

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // Validate content type
    if (!contentType) {
      return res.status(400).json({
        success: false,
        message: 'Content type is required',
      });
    }

    const newContent = await ContentService.createContent({
      userId,
      title,
      description,
      contentType,
      metaData,
      status: status || 'draft', // Default status if not provided
    });

    return res.status(201).json({
      success: true,
      data: newContent,
    });
  } catch (error) {
    console.error('Error creating content:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getAllContents = async (req, res) => {
  try {
    // Placeholder for fetching all contents
    const content = await ContentService.getAllContents();
    const contents = content.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      contentType: c.contentType,
      metadata: c.metadata,
      status: c.status,
    }));
    return res.status(200).json({
      success: true,
      data: contents,
    });
  } catch (error) {
    console.error('Error fetching contents:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { title, description, contentType, metadata, status } = req.body;
    console.log('Content ID to update:', contentId);

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Title and description are required',
      });
    }

    // Validate content type
    if (!contentType) {
      return res.status(400).json({
        success: false,
        message: 'Content type is required',
      });
    }
    const updatedContent = await ContentService.updateContent(contentId, {
      title,
      description,
      contentType,
      metadata,
      status,
    });
    if (!updatedContent) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: updatedContent,
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;

    const deletedContent = await ContentService.deleteContent(contentId);
    if (!deletedContent) {
      return res.status(404).json({
        success: false,
        message: 'Content not found',
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Content deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export default { createContent, getAllContents, updateContent, deleteContent };
