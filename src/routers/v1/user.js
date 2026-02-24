// After /users the remainaing part of url is handled here
import express from 'express';
import { getProfile,signup, signin } from '../../controllers/userController.js';
import { zodSignupSchema, } from '../../validators/zodSignUpValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';
import { validate } from '../../validators/zodValidator.js';
const router = express.Router();

/**
 * @swagger
 * /users/signup:
 *  post:
 *      summary: Signup a new user
 *      description: Signup a new user
 * 
 */

router.get('/profile', getProfile);
router.post('/signup', validate(zodSignupSchema), signup);
router.post('/signin', validate(zodSigninSchema), signin);

/**
 * @swagger
 * /users/signin:
 *  post:
 *      summary: Signin a new user
 *      description: Signin a new user
 * 
 */

export default router;