import bcrypt from 'bcryptjs'
import UserModel from '../models/user.model';

export const registerController = async (req, res) => {
    // after making all validations we register the user
    // while registering we will hash the password

    try {
        const { username, email, password } = req.body;
        //validations
        // these valiations could alos be removed and kept only in the client side
        if (!username) {
            return res.send({ message: "userName is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (password.lenght < 6) {
            return res.send({ message: "Password should be atleast of 6 charcters" })
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        const hashedPassword = await bcrypt.hash(password, 10);
        // Higher rounds = more computation = stronger encryption.
        //save
        const user = await new userModel({
            username,
            email,
            password: hashedPassword,
        }).save();


        //now generate token

        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
}