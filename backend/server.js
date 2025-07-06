import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route.js';
dotenv.config();
connectDB();

const port = process.env.PORT || 8080;

//making simple server
const app = express();

// routes
app.use('/api/v1/auth', authRoute);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})