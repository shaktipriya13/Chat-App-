import userModel from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;//getting from the isAuth middlware
        // let user = await userModel.findOne(userId).select('-password');❌ findOne() expects an object, not just an ID.
        // let user = await userModel.findOne(userId).select('-password');
        const user = await userModel.findById(userId).select('-password');



        if (!user) {
            return res.status(400).json({ message: "User does not exists." })
        }
        // return res.status(201).json({ message: `User details: ${user}` })
        return res.status(200).json({ message: "User details fetched successfully", user });



    } catch (err) {
        // return res.status(500).json({ message: "Error in getting current user details.", err });
        return res.status(500).json({ message: "Error in getting current user details.", err: err.message });        // console.log(err);
    }
}