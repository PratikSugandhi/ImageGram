import express from 'express';
import { createComment,getCommentById } from '../../controllers/commentController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated,  createComment);

router.get('/:id', isAuthenticated, getCommentById);

export default router;