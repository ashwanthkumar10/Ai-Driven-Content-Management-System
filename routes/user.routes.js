import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create-user', userController.createUser);
router.put('/edit-user/:id', userController.editUser);

export default router;
