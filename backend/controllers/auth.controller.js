import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js';
import genToken from '../config/token.js';

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
        const token = genToken(user._id);
        // now store this token in cookies
        res.cookie("token", token, {
            //  This sets a cookie in the browser named "token" and stores the value of token (like a login key or JWT).
            httponly: true,//When the cookie is set with it, JavaScript can’t read it at all: console.log(document.cookie); // token not shown!

            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",//Useful when your frontend & backend are on different domains. This controls when cookies are sent in cross-site requests (like from another domain or frontend).
            secure: false
        })

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


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await bcrypt.compare(password, user.password);//returns true or false
        // password is the current enterd passowrd
        // user.password is the password stord in db for the concerned loggedin user
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        //token generation 
        const token = await genToken(user._id);
        res.cookie("token", token, {
            //  This sets a cookie in the browser named "token" and stores the value of token (like a login key or JWT).
            httponly: true,//When the cookie is set with it, JavaScript can’t read it at all: console.log(document.cookie); // token not shown!

            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "None",//Useful when your frontend & backend are on different domains. This controls when cookies are sent in cross-site requests (like from another domain or frontend).
            secure: false
        })

        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,

            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error,
        });
    }
};


export const logoutController = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).send({
            success: true,
            message: "Logout successful.",
        });
    } catch (err) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in logout",
            error,
        });
    }
}