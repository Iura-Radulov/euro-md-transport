import { connectToDB } from "@/utils/database";

import User from "@/models/user";
import bcrypt from "bcrypt";

export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const { id } = await params
        const users = await User.findById(id)
        if(!users) return new Response("User not found", {status:404})
        return new Response(JSON.stringify(users), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500, statusText: e.message})
    }
}

export const PATCH = async(request, {params})=>{
    const {email, password, name, role} = await request.json()

    try{
        await connectToDB()
        const { id } = await params
        const existingUser = await User.findById(id)
        if(!existingUser) return new Response("User not found", {status: 404})

       if(email) {
           existingUser.email = email
       }
        if(password) {
            existingUser.password = await bcrypt.hash(password, 10);
        }
        if(name) {
            existingUser.name = name
        }
        if(role) {
            existingUser.role = role
        }


        await existingUser.save()

        return new Response("Successfully updated the User", {status:200})
    } catch (e) {
        return new Response("Error updating User", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()
        const { id } = await params
        console.log('params.id', id);


        // const existingCity = await City.findById(params.id)
await User.findOneAndDelete({ _id: id.toString().trim() })

        return new Response("User deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting City", {status:500})
    }
}
