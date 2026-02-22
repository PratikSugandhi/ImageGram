import express from 'express';
import connectDB from './src/config/dbConfig.js';
import { createPost } from './src/controllers/postController.js';
import { s3uploader } from './src/config/multerConfig.js';

const PORT = 3000; // port number

const app = express(); // create express app server instance

app.get('/ping', (req, res) => {
    // this is how we can see the content passed using query like ? in url.
     console.log(req.query);
    console.log(req.body);
    return res.json({ message: 'pong' });
});
// here we use this so that to show how middleware chaining can be use
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.post('/post',s3uploader.single('image'),createPost)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});

