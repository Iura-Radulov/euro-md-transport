import { connectToDB } from "@/utils/database";
import Service from "@/models/service";

export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const items = await Service.findById(params.id).populate("category")
        if(!items) return new Response("Service not found", {status:404})
        return new Response(JSON.stringify(items), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500})
    }
}

export const PATCH = async(request, {params})=>{
    const {nameEn, nameRo, nameRu, category, questions,time, place} = await request.json()

    try{
        await connectToDB()
        const existingItem = await Service.findById(params.id).populate("category")
        if(!existingItem) return new Response("Service not found", {status: 404})

        existingItem.nameEn = nameEn
        existingItem.nameRo = nameRo
        existingItem.nameRu = nameRu
        existingItem.category = category
        existingItem.questions = questions
        existingItem.time = time
        existingItem.place = place
        await existingItem.save()

        return new Response("Successfully updated the Service", {status:200})
    } catch (e) {
        return new Response("Error updating Service", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()

await Service.findOneAndDelete({ _id: params.id.toString().trim() })

        return new Response("Service deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting Service", {status:500})
    }
}
