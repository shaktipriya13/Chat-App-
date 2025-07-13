// we normally create a server from http as we did while creating a server from node, and then we convert this server to a websocket
import http from "http"
import express from "express"
import { Server } from "socket.io"//socket.io itself also provides a server

let app = express()

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
const userSocketMap = {}
export const getReceiverSocketId = (receiver) => {
    return userSocketMap[receiver]
}


// now we are connecting our io to the frontend


// This code listens for new connections and disconnections from users and keeps track of who is online.
// in socket.io world user is called a socket
// jaise a user gets connected socket.io assigns him an id called as socket id
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId
    if (userId != undefined) {
        userSocketMap[userId] = socket.id
    }

    // if we want to send something to our backend from frontend through socket.io we use emit function
    // emit means sabhi users ko msg send ho jayega
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
    // emit se we send msg and receive through on 

    socket.on("disconnect", () => {
        // jaise hi koi disconnect hoga uski socket id hat jayegi
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))

    })

})



export { app, server, io }