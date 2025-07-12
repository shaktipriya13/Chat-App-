import express from 'express'
import isAuth from './../middlewares/isAuth';
import { getMessages, sendMessage } from '../controllers/message.controllers';
import { upload } from '../middlewares/multer.js'

const msgRouter = express.Router();

msgRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage);
msgRouter.get("/get/:receiver", isAuth, getMessages);

export default msgRouter;