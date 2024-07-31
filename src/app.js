import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// if user want to give json data
app.use(express.json({limit: "16kb"}))
// taking value from url it will encrept the url like %20 and these type of thing 
app.use(express.urlencoded({extended: true, limit:"16kb"}))
// static will do like many time we want to store any file like pdf img so we make an public asset so that anyone can use that 
app.use(express.static("public")) 
// here cookieParser is used like ki mai mere server se jo user ka browser hai uske andar ki cookies access kar pau aur uski cookies set kar pau 
// so uski cookies pe basically mai crud operation perform kar pau 

app.use(cookieParser())

// routes import 
import userRouter from './routes/user.routes.js'

// route declaration
// app.use("/users", userRouter)
// above is also fine but if we talk about standard practice so if we are defining our api so we should tell the version of that 

app.use("/users", userRouter)

app.use("/api/v1/users", userRouter)

export {app} 