// Here all the post related routes are present
// We look at the remaining url part after /posts
import express from 'express';

import { s3uploader } from '../../config/multerConfig.js';
import { createPost, getAllPosts, deletePost,updatePost } from '../../controllers/postController.js';
import {zodPostSchema} from '../../validators/zodPostSchema.js'
import { validate } from '../../validators/zodValidator.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';
const router = express.Router(); // Router object to modularize the routes

// router.post('/', s3uploader.single('image'), createPost);

router.get('/', getAllPosts);
router.post('/', isAuthenticated,  s3uploader.single('image'), validate(zodPostSchema), createPost);
router.delete('/:id', deletePost);
router.put('/:id', s3uploader.single('image'),validate(zodPostSchema), updatePost);

export default router;