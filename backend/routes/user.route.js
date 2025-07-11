import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import { editprofile, getCurrentUser } from '../controllers/user.controller.js';
import { upload } from '../public/.gitkeep';

const userRouter = express.Router();


userRouter.get('/current', isAuth, getCurrentUser);//isAuth pehle chalane se we get the user_id from token in the req.body and now we can use if for getting details in our next getCurrentUser fxn

userRouter.put('/profile', isAuth, upload.single("image"), editprofile);

export default userRouter;