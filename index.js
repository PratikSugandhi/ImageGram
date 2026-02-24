import express from 'express';
import connectDB from './src/config/dbConfig.js';
import { createPost } from './src/controllers/postController.js';
import apiRouter from './src/routers/apiRouter.js';
import multer from 'multer';
import { isAuthenticated } from './src/middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './src/utilies/swaggerOptions.js';
import { rateLimit } from 'express-rate-limit';
import ip from 'ip'

const PORT = 3000; // port number

const app = express(); // create express app server instance

const upload = multer();

// Removed this authenticated so that when we deploy so while run this no any authentication is asked and also we write ping so that we ccan check whaeter after deploying is server is up or not.
app.get('/ping',/*isAuthenticated,*/ (req, res) => {
    // this is how we can see the content passed using query like ? in url.
     console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    const ipaddr = ip.address();
    return res.json({ message: 'pong' + ipaddr });
});

const limiter = rateLimit({
    windowMs: 0.5 * 60 * 1000, // 30 seconds
    max: 5 // limit each IP to 5 requests per windowMs
});

app.use(limiter); // apply rate limiter to every requests


// here we use this so that to show how middleware chaining can be use
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());


const swaggerDocs = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', apiRouter);// If the url starts with /api then the request is forwarded to the apiRouter
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});


// client. -----> LB ------> server1
//                   ------> server2       




// Figure out alternatives to store jwt tokens on the client side

// and impl a solution storing it with different alternatives

// try to deploy both the frontend and backend and see if the jwt token based is working or not