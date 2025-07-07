import express from 'express';
import isAuth from '../middlewares/isAuth';
import { getCurrentUser } from '../controllers/user.controller.js';

const userRouter = express.Router();


userRouter.get('/current', isAuth, getCurrentUser);//isAuth pehle chalane se we get the user_id from token in the req.body and now we can use if for getting details in our next getCurrentUser fxn

export default userRouter;