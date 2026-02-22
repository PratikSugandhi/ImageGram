import express from 'express';
import connectDB from './src/config/dbConfig.js';
import { createPost } from './src/controllers/postController.js';

const PORT = 3000; // port number

const app = express(); // create express app server instance

app.get('/ping', (req, res) => {
    return res.json({ message: 'pong' });
});
// here we use this so that to show how middleware chaining can be use
function middleware1(req,res,next)
{
    console.log('middleware1');
    next();
}
function middleware2(req,res,next)
{
    console.log('middleware2');
    next();
}
function middleware3(req,res,next)
{
    console.log('middleware3');
    next();
}
app.post('/post',middleware1,middleware2,middleware3,createPost)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

