import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,//jo bhi user ha uski mongodb id yha store ho jayegi
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: ""
    }
}, { timestamps: true })//timestamps will record ki kis samay msg bhejega wo

const Message = mongoose.model("Message", messageSchema);
export default Message;