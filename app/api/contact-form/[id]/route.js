import { connectToDB } from "@/utils/database";


import ContactForm from "@/models/contact_form";


export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const { id } = await params
        const items = await ContactForm.findById(id)
        if(!items) return new Response("ContactForm not found", {status:404})
        return new Response(JSON.stringify(items), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500, statusText: e.message})
    }
}

export const PATCH = async(request, {params})=>{
    const { name, phone, message, status} = await request.json()

    try{
        await connectToDB()
        const { id } = await params
        const existingContactForm = await ContactForm.findById(id)
        if(!existingContactForm) return new Response("ContactForm not found", {status: 404})

       if(name) {
           existingContactForm.name = name
       }
        if(message) {
            existingContactForm.message = message;
        }
        if(phone) {
            existingContactForm.phone = phone
        }
        if(status) {
            existingContactForm.status = status
        }


        await existingContactForm.save()

        return new Response("Successfully updated the ContactForm", {status:200})
    } catch (e) {
        return new Response("Error updating ContactForm", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()
        const { id } = await params


        // const existingCity = await City.findById(params.id)
    await ContactForm.findOneAndDelete({ _id: id.toString().trim() })

        return new Response("ContactForm deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting ContactForm", {status:500})
    }
}
