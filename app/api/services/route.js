import { connectToDB } from "@/utils/database";
import Service from "@/models/service";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const services = await Service.find({ }).populate('category')

        return new Response(JSON.stringify(services), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch items", { status: 500 })
    }
}
