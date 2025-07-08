import bcrypt from 'bcryptjs'
import userModel from '../models/user.model.js';
import genToken from '../config/token.js';

export const registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validations
        if (!username) {
            return res.status(400).send({ success: false, message: "Username is required" });
        }
        if (!email) {
            return res.status(400).send({ success: false, message: "Email is required" });
        }
        if (!password) {
            return res.status(400).send({ success: false, message: "Password is required" });
        }
        if (password.length < 6) {
            return res.status(400).send({ success: false, message: "Password should be at least 6 characters long" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ // 409 = Conflict
                success: false,
                message: "User already registered. Please login.",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const user = await new userModel({
            username,
            email,
            password: hashedPassword,
        }).save();

        // Generate token
        const token = genToken(user._id);

        // Set token in HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            sameSite: "Strict",
            // secure: process.env.NODE_ENV === "production", // Set true in production
            secure: false
        });

        // Remove password from response
        const { password: pw, ...userData } = user._doc;

        // Send response
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user: userData,
        });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error: error.message,
        });
    }
};

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
            sameSite: "Strict",//should be none when your frontend & backend are on different domains. This controls when cookies are sent in cross-site requests (like from another domain or frontend).
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