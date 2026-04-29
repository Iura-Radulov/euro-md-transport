import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

import {put} from "@vercel/blob";

export const POST = async (request) => {

    let imagePath =''
    try {
        await connectToDB();
        const data = await request.formData()
        const file = data.get('file')
        const nameEn = data.get('nameEn')
        const nameRo = data.get('nameRo')
        const nameRu = data.get('nameRu')
        // const buffer = Buffer.from(await file.arrayBuffer());
        const imageName =  file.name.replaceAll(" ", "_");
        // imagePath = "/assets/categories/" + imageName

        const blob = await put("category/"+imageName, file, {
            access: 'public',
        });

        imagePath = blob.url
        // await writeFile(
        //     path.join(process.cwd(), "public/assets/categories/" + imageName),
        //     buffer
        // );
        const newCategory = new Category({ nameEn, nameRo, nameRu, imagePath });

        await newCategory.save();
        return new Response(JSON.stringify(newCategory), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new category", { status: 500 });
    }
}
