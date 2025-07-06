import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const port = process.env.PORT || 8080;

//making simple server
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow Vite React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true//means backend Allow the frontend to send cookies, authentication tokens, or any secure info (like sessions)** along with requests.”
}));
app.use(express.json());//whenver we take data from body as post requst we need theis middlware.It tells your Express server to automatically read incoming JSON data from the body of a POST (or PUT/PATCH) request — so you can access it easily.It will automatically parse the JSON for you, and you can access it in your route like:console.log(req.body.name); // "Shakti"
app.use(cookieParser());

// routes
app.use('/api/v1/auth', authRoute);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})