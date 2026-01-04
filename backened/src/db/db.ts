import { DB_NAME } from "../constaints.js";
import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        const connectionsInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! db host:${connectionsInstance.connection.host}`)

        
    } catch (error) {
            console.log("mongodb connection failed ",error);
        process.exit(1)
        
    }
}
export {connectDB}