// this will be used for authorizing the logged in user
// if the user is authenticated then its details would be taken off from the token stored 
// this is a middlware fxn


// It's a middleware in Express.js used to:
// Allow only logged -in users to access protected routes
// (by checking their JWT token stored in cookies)

import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
    try {
        // we have to taken token from request body and extract id from it
        let token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "Token is not found. Please login again" });
        }
        // if u get token
        let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);// Signature is re-calculated using secret key and compared

        console.log(verifyToken);
        req.userId = verifyToken.userId;//jo bhi user id we are getiting from cookies we are storing it in req.userId

        next();// If everything is okay, this moves the request to the next middleware or route.
    } catch (err) {
        return res.status(500).json({ message: `isAuth error: ${err}` });
    }
}
export default isAuth;
// ✨ Summary(in Hinglish):
// User ne login kiya → token cookie me save hua

// Ye middleware har request pe token padhta hai

// Agar token valid hai → req.userId me user ka ID store karta hai

// Fir route continue karta hai

// Agar token invalid hai → request reject kar deta hai

