import express from 'express';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/create-user', userController.createUser);
router.put('/edit-user/:id', userController.editUser);
router.get('/get-all-users', userController.getAllUsers);

export default router;
