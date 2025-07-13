import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import msgRouter from './routes/message.route.js';
import { app, server } from './socket/socket.js';

dotenv.config();
connectDB();

const port = process.env.PORT || 8080;

//making simple server
// const app = express();

// we are importing app server from socekt.io
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow Vite React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true//means backend Allow the frontend to send cookies, authentication tokens, or any secure info (like sessions)** along with requests.”
}));
app.use(express.json());//whenver we take data from body as post requst we need theis middlware.It tells your Express server to automatically read incoming JSON data from the body of a POST (or PUT/PATCH) request — so you can access it easily.It will automatically parse the JSON for you, and you can access it in your route like:console.log(req.body.name); // "Shakti"
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/msg', msgRouter);


// here we will not be listengin node server but the socket.io server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

