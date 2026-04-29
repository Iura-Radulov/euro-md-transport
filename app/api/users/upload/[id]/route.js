import { connectToDB } from "@/utils/database";

import User from "@/models/user";
import {put} from "@vercel/blob";



export const PATCH = async(request, {params,req})=>{
    const data = await request.formData()
    const file = data.get('file')
    // const host = process.env.NEXTAUTH_URL;
    let imagePath =''
    try{
        await connectToDB()
        const existingUser = await User.findById(params.id)
        if(!existingUser) return new Response("User not found", {status: 404})

       if(file) {
           // const buffer = Buffer.from(await file.arrayBuffer());
           const imageName =  file.name.replaceAll(" ", "_");
           const blob = await put("users/"+imageName, file, {
               access: 'public',
           });

           imagePath = blob.url
           // imagePath = "/assets/users/" + imageName
           // await writeFile(
           //     path.join(process.cwd(), "public/assets/users/" + imageName),
           //     buffer
           // );

           existingUser.image = imagePath
       }


        await existingUser.save()

        return new Response(JSON.stringify({image: imagePath}), {status:200})
    } catch (e) {
        return new Response("Error updating User", {status:500})
    }
}

