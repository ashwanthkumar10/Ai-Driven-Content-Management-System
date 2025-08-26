import express from 'express';
import userController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/create-user',authMiddleware ,  userController.createUser);


router.put('/edit-user/:id', authMiddleware,  userController.editUser);
router.get('/get-all-users',authMiddleware,  userController.getAllUsers);

export default router;
