import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"
import {connectDB} from "./lib/db.js"
import {inngest,functions} from "./lib/inngest.js"
import cors from "cors"
import {serve} from "inngest/express"
const app = express()
const __dirname = path.resolve()

//middleware
app.use(express.json());
//credentails:true means server allows browser to keep  cookies on request
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))

app.use("api/inngest", serve({client: inngest,functions}));

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
    console.log("server is running on port:",ENV.PORT);
    connectDB();
})

const startServer = async ()=>{
    try{
        await connectDB();
        app.listen(ENV.PORT,()=>{
        console.log("server is running on port:",ENV.PORT);
        })
    }catch(err){
        console.err("Error starting the server: ",err);
    }
}