import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants: [//this will be an array of 2 members: sender and receiver
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    messages: [
        // messages is also an array of strings
        { type: String }
    ]
}, { timestamps: true })

const Conversation = mongoose.model("Conversaton", conversationSchema);
export default Conversation;