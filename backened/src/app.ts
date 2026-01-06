import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import authRouter  from "./routes/Auth.route.js"
import UsersRouter from "./routes/Users.route.js"
import PostRouter from "./routes/Post.router.js"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

app.use("/assets",express.static(path.join(process.cwd(),"public/assets")))


app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("./public/assets"))
app.use(cookieParser())


//routes
app.use("/api/v1/users",authRouter)
app.use("/users",UsersRouter)
app.use("/posts",PostRouter)

export {app}
