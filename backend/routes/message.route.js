import express from 'express'
import isAuth from './../middlewares/isAuth';
import { sendMessage } from '../controllers/message.controllers';
import { upload } from '../middlewares/multer.js'

const msgRouter = express.Router();

msgRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);

export default msgRouter;