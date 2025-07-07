// express is a very big object
import express from 'express'
import { loginController, logoutController, registerController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup', registerController);
authRouter.post('/login', loginController);
authRouter.get('/logout', logoutController);//we don't take any data from user in logout,so its a get request

export default authRouter;