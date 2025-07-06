// express is a very big object
import express from 'express'
import { registerController } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/signup', registerController);

export default authRoute;