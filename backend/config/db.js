import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`connected to mongodb success. ${conn.connection.host}`.bgGreen.white);
    } catch (err) {
        console.log("error in connnecting to db".bgRed.white);
        console.log(err);
    }
}

export default connectDB;