import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,

    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    image: {
        type: String,
        default: ''
    }
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;//by exporting User model now we edit /add/update/delete this model items