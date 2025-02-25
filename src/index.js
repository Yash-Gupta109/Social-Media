// imp note
// 1-whenever we will try to talk to the database so problems can occure so we should wrap it in try catch
// 2-database is always in other continent so it will take time so use async await
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import {app} from './app.js'

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ",err);
})









// *** another version of doing same thing ***
// import express from "express";
// const app=express()
// // ifei it will execute function imideately 
// // many time we use ; before writing ifie just for cleaning purpose because if in previous line someone not added in last ; so it will may can occure problem 
// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("ERRR",error)
//             throw error 
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
//     } catch (error) {
//         console.error('Error: ',error)
//         throw error
//     }
// })()