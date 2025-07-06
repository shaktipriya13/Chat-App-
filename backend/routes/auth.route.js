// express is a very big object
import express from 'express'
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/signup', registerController);
authRoute.post('/login', loginController);
authRoute.get('/logout', logoutController);//we don't take any data from user in logout,so its a get request

export default authRoute;