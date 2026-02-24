
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    // to decide that on what catagry this comment is made like on reels,posts or story or comment or any other type
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Comment"],
    },
    // to decide that on what catagry this comment is liked like on reels,posts or story or comment or any other type so it is id of that catogory.

    // In Mongoose, refPath is used for dynamic referencing (dynamic population).Normally in Mongoose, when you use ref, you reference one fixed model.But with refPath, you can reference different models dynamically based on the value of another field.
    commentableId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "onModel",
    },
    // this replies use is define below
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

/**
 * C1:
 *  replies: [
 *      C2
 *      C3
 *      C4: 
 *          replies: [C5]
 *      
 *  ]
 */