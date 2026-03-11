import {Inngest} from "inngest"
import {connectDB} from "./db.js"
import User from "../models/User.js"

export const inngest = new Inngest({id : "interview-platform"})

const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({event}) => {
        await connectDB();
        
        const {id,email_adresses, first_name,last_name,img_url} = event.data;

        const newUser = {
            clerkId: id,
            email: email_adresses[0]?.email_adress,
            name: `${first_name|| ""} ${last_name || ""}`,
            profileImage: img_url  
        }

        await User.create(newUser)
    }
)

const deleteUserFromDb = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async ({event}) => {
        await connectDB();
        const {id} = event.data;

        await User.deleteOne({clerkId:id});
    }
)
export const functions = [syncUser,deleteUserFromDb]