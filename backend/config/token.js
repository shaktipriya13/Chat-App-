import jwt from 'jsonwebtoken';
const genToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });//here userId is passed  to tell ki kon user token ko generate kr rha ha
        console.log("Token generated:", token);
        return token;
    } catch (err) {
        console.log("token generation error");
    }
}
export default genToken;