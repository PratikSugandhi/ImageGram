import mongoose from "mongoose";
// creating the schema
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 5,
        validate: {
            validator: function (emailValue) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue);
            },
            message: 'Invalid email format'
        },
        
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
}, { timestamps: true });

// pre is like a trigger which is envoked when an event occcures like just before signing or like after signing.
userSchema.pre('save', function modifyPassword(next) {
    // incoming user object
    const user = this; // object with plain password

    const SALT = bcrypt.genSaltSync(9);

    // hash password

    const hashedPassword = bcrypt.hashSync(user.password, SALT);

    // replace plain password with hashed password
    user.password = hashedPassword;

    next();
});


// converting the schema into collections.
const user = mongoose.model("User", userSchema); // user collection



export default user;