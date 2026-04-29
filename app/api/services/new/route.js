import { connectToDB } from "@/utils/database";
import Service from "@/models/service";
import { writeFile } from 'fs/promises'
import path from "path";

export const POST = async (request) => {
    // const { nameEn, nameRo, nameRu, category } = await request.json();

    try {
        await connectToDB();
        const data = await request.formData()
        const nameEn = data.get('nameEn')
        const nameRo = data.get('nameRo')
        const nameRu = data.get('nameRu')
        const category = data.get('category')
        const questions = data.get('questions')
        const time = data.get('time')
        const place = data.get('place')


        const newCategory = new Service({category, nameEn, nameRo, nameRu, questions, time, place });

        await newCategory.save();
        return new Response(JSON.stringify(newCategory), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new Service", { status: 500 });
    }
}
