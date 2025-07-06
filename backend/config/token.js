import jwt from 'jsonwebtoken';
const genToken = async (userId) => {
    try {
        const token = await jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("Token generated:", token);
        return token;
    } catch (err) {
        console.log("token generation error");
    }
}
export default genToken;