import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import authRouter from "./routes/Auth.route.js"
import PartnerRouter from "./routes/Partner.router.js"
import FoodRouter from "./routes/Food.route.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

app.use("/assets", express.static(path.join(process.cwd(), "public/assets")))


app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("./public/assets"))
app.use(cookieParser())


//routes
//auth toutes
app.use("/api/v1/users", authRouter)

//partner routes 
app.use("/api/v1/partner", PartnerRouter)

//food route
app.use("/api/v1/food",FoodRouter)




export { app }
