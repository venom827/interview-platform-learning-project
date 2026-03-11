import mongoose from "mongoose"
import {ENV} from "./env.js"


export const connectDB = async()=>{

    try{
        if(!ENV.DB_URL) throw new Error("DB_URL env variable isnt defined");
        
        const conn = await mongoose.connect(ENV.DB_URL);
        console.log("Success in connecting to DB✅: ",conn.connection.host);
    }catch(err){
        console.err("Couldnt connect to db❌")
        process.exit(1);
    }

}