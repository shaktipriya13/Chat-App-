// we will be storing images we got in frontend in the public folder and upload them on cloudinary and the delete the image once they are uploaded on cloudinary

import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

export const upload = multer({ storage })