import { connectToDB } from "@/utils/database";
import City from "@/models/city";

export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const cities = await City.findById(params.id)
        if(!cities) return new Response("City not found", {status:404})
        return new Response(JSON.stringify(cities), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500})
    }
}

export const PATCH = async(request, {params})=>{
    const {nameEn, nameRo, nameRu} = await request.json()

    try{
        await connectToDB()
        const existingCity = await City.findById(params.id)
        if(!existingCity) return new Response("City not found", {status: 404})

        existingCity.nameEn = nameEn
        existingCity.nameRo = nameRo
        existingCity.nameRu = nameRu
        await existingCity.save()

        return new Response("Successfully updated the City", {status:200})
    } catch (e) {
        return new Response("Error updating City", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()
        console.log('params.id', params.id);
        console.log('typeof params.id',typeof params.id);

        // const existingCity = await City.findById(params.id)
await City.findOneAndDelete({ _id: params.id.toString().trim() })

        return new Response("City deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting City", {status:500})
    }
}
