import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true,
        minLength: 5
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // this we use so that we find the user who posted, can assign particular post to it's particular user who posted it and also ref is the name that we call for who posted it.
        ref: "User"
    },
     comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    // in one post there may be multiple likes and comments  so combinely all coments are present in comments array and all likes in likes array.
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
},{timestamps:true});

const post = mongoose.model("Post", postSchema); // post collection

export default post;