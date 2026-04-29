import { connectToDB } from "@/utils/database";
import EuropaLocation from "@/models/europa_location";


export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const { id } = await params
        const items = await EuropaLocation.findById(id)
        if(!items) return new Response("EuropaLocation not found", {status:404})
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
        const existingEuropaLocation = await EuropaLocation.findById(id)
        if(!existingEuropaLocation) return new Response("EuropaLocation not found", {status: 404})

       if(nameEn) {
           existingEuropaLocation.nameEn = nameEn
       }
        if(nameRo) {
            existingEuropaLocation.nameRo = nameRo;
        }
        if(nameRu) {
            existingEuropaLocation.nameRu = nameRu
        }



        await existingEuropaLocation.save()

        return new Response("Successfully updated the EuropaLocation", {status:200})
    } catch (e) {
        return new Response("Error updating EuropaLocation", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()
        const { id } = await params


        // const existingCity = await City.findById(params.id)
    await EuropaLocation.findOneAndDelete({ _id: id.toString().trim() })

        return new Response("EuropaLocation deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting City", {status:500})
    }
}
