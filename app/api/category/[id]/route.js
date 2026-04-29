import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

import {put} from "@vercel/blob";

export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const items = await Category.findById(params.id)
        if(!items) return new Response("Category not found", {status:404})
        return new Response(JSON.stringify(items), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500})
    }
}

export const PATCH = async(request, {params})=>{

    let imagePath =''

    try{
        await connectToDB()
        const existingItem = await Category.findById(params.id)
        if(!existingItem) return new Response("Category not found", {status: 404})
        const data = await request.formData()

        const file = data.get('file')
        const nameEn = data.get('nameEn')
        const nameRo = data.get('nameRo')
        const nameRu = data.get('nameRu')
        if(file) {

            const imageName =  file.name.replaceAll(" ", "_");
            const blob = await put("category/"+imageName, file, {
                access: 'public',
            });

            imagePath = blob.url

            existingItem.imagePath = imagePath
        }

        existingItem.nameEn = nameEn
        existingItem.nameRo = nameRo
        existingItem.nameRu = nameRu
        await existingItem.save()

        return new Response(JSON.stringify(existingItem), {status:200})
    } catch (e) {
        return new Response("Error updating Category", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()

await Category.findOneAndDelete({ _id: params.id.toString().trim() })

        return new Response("Category deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting Category", {status:500})
    }
}
