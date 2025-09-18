import express from 'express';
import { requirePermission } from '../middlewares/permissionMiddlewares.js';
import contentController from '../controllers/content.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post(
  '/create-content',
  authMiddleware,
  requirePermission('create_content'),
  contentController.createContent
);
router.get(
  '/get-all-contents',
  authMiddleware,
  requirePermission('view_content'),
  contentController.getAllContents
);
router.put(
  '/edit-content/:id',
  authMiddleware,
  requirePermission('edit_content'),
  contentController.updateContent
);
router.delete(
  '/delete-content/:id',
  authMiddleware,
  requirePermission('delete_content'),
  contentController.deleteContent
);

export default router;
