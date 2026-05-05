import { connectToDB } from "@/utils/database";


import TransportForm from "@/models/transport_form";


export const GET = async(request, {params}) =>{
    try {
        await connectToDB()
        const { id } = await params
        const items = await TransportForm.findById(id)
        if(!items) return new Response("TransportForm not found", {status:404})
        return new Response(JSON.stringify(items), {status:200})
    } catch (e) {
        return new Response("Internal Server Error", {status:500, statusText: e.message})
    }
}

export const PATCH = async(request, {params})=>{
    const { fromDestination, toDestination, phone } = await request.json()

    try{
        await connectToDB()
        const { id } = await params
        const existingTransportForm = await TransportForm.findById(id)
        if(!existingTransportForm) return new Response("TransportForm not found", {status: 404})

       if(fromDestination) {
           existingTransportForm.fromDestination = fromDestination
       }
        if(toDestination) {
            existingTransportForm.toDestination = toDestination;
        }
        if(phone) {
            existingTransportForm.phone = phone
        }



        await existingTransportForm.save()

        return new Response("Successfully updated the TransportForm", {status:200})
    } catch (e) {
        return new Response("Error updating TransportForm", {status:500})
    }
}

export const DELETE = async(request, {params})=> {
    try{
        await connectToDB()
        const { id } = await params


        // const existingCity = await City.findById(params.id)
    await TransportForm.findOneAndDelete({ _id: id.toString().trim() })

        return new Response("TransportForm deleted successfully", {status: 200})
    } catch (e) {
        return new Response("Error deleting City", {status:500})
    }
}
