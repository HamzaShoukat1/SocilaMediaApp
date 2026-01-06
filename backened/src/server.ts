// import dotenv from "dotenv"

// dotenv.config({
//     path: "..env"
// })

import { app } from "./app.js"
import { connectDB } from "./db/db.js"

const startServer = async (): Promise<void> => {
    try {
        await connectDB();

        const PORT:number = Number(process.env.PORT) 

        const server = app.listen(PORT, () => {
            console.log(`server is running on port,${PORT}`);

   
        });
        server.on("error", (error:Error)=> {
            console.error(" Server error:", error);
      process.exit(1);

        })
console.log("RAW PORT:", process.env.PORT);


    } catch (error) {
        console.error(" Failed to start server:", error);
        process.exit(1);


    }

}
startServer()