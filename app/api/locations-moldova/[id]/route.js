import { connectToDB } from "@/utils/database";


import MoldovaLocation from "@/models/moldova_location";
import bcrypt from "bcrypt";

export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const { id } = await params
        const items = await MoldovaLocation.findById(id)
        if(!items) return new Response("MoldovaLocation not found", {status:404})
        return new Response(JSON.stringify(items), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500, statusText: e.message})
    }
}

export const PATCH = async(request, {params})=>{
    const {nameEn, nameRo, nameRu } = await request.json()

    try{
        await connectToDB()
        const { id } = await params
        const existingMoldovaLocation = await MoldovaLocation.findById(id)
        if(!existingMoldovaLocation) return new Response("MoldovaLocation not found", {status: 404})

       if(nameEn) {
           existingMoldovaLocation.nameEn = nameEn
       }
        if(nameRo) {
            existingMoldovaLocation.nameRo = nameRo;
        }
        if(nameRu) {
            existingMoldovaLocation.nameRu = nameRu
        }



        await existingMoldovaLocation.save()

        return new Response("Successfully updated the MoldovaLocation", {status:200})
    } catch (e) {
        return new Response("Error updating MoldovaLocation", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()
        const { id } = await params


        // const existingCity = await City.findById(params.id)
    await MoldovaLocation.findOneAndDelete({ _id: id.toString().trim() })

        return new Response("MoldovaLocation deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting City", {status:500})
    }
}
