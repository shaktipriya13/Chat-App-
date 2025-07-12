//these controllers will help in sending and receiveing msgs
// conversation and msg controller are linked by each other

import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        let sender = req.userId
        let { receiver } = req.params
        let { message } = req.body

        let image;
        if (req.file) {
            // This file field comes from multer.js
            image = await uploadOnCloudinary(req.file.path)
        }

        // agar pehle conversation ho chuki ha receiver se then we only push the new msgs in the older conversaton collection model else if the receiver is new, then we just create a new conversation 
        let conversation = await Conversation.findOne({
            partcipants: { $all: [sender, receiver] }
            // $all is used to check if an array contains all the given values, in any order.
        })

        let newMessage = await Message.create({//we create the new msg  
            sender, receiver, message, image
        })

        if (!conversation) {//if conv. don't exists
            conversation = await Conversation.create({
                partcipants: [sender, receiver],
                messages: [newMessage._id]
            })
        } else {//if conversation already exists. ie. pehle bhi batchit hui thi 
            conversation.messages.push(newMessage._id)//mongodb id of the newly created msg in the msg model is pushed in the conversation....Har time ek pura conversation model msg model me save hoga

            // we are creating conversation models each time users talk
            await conversation.save()
        }

        const receiverSocketId = getReceiverSocketId(receiver)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }



        return res.status(201).json(newMessage)

    } catch (error) {
        return res.status(500).json({ message: `send Message error ${error}` })
    }
}

export const getMessages = async (req, res) => {
    // This controller is used get the msgs of the conversation
    try {
        let sender = req.userId;
        let { receiver } = req.params;
        // with braces {}:"From req.params, extract only the receiver key and assign it directly to a variable named receiver.
        // without: Assign the whole object req.params to receiver.
        let conversation = await Conversation.findOne({//we find the conversation first
            partcipants: { $all: [sender, receiver] }
        }).populate("messages")//Mongoose automatically fetches the actual message documents from the Message collection. Replaces messages array of IDs with actual message documents. eg:
        // {
        //     partcipants: ['Aditi', 'Riya'],
        //         messages: [
        //             { _id: '65b2e1...', message: "Hare Krishna", sender: "...", ... },
        //             { _id: '65b2e2...', message: "Radhe Radhe", sender: "...", ... }
        //         ]
        // }


        return res.status(200).json(conversation?.messages)

    } catch (error) {
        return res.status(500).json({ message: `get Message error ${error}` })
    }
}