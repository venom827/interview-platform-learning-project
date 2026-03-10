import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"
const app = express()
const __dirname = path.resolve()
app.get("/test",(req,res)=>{
    return res.status(200).json({msg:"success from api"})
})
app.get("/prop",(req,res)=>{
    return res.status(200).json({msg:"this is prop endoint"})
})

if (ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
    app.get("/{*any}",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}


app.listen(ENV.PORT,()=>{
    console.log("server is running on port:",ENV.PORT)
})