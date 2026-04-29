import { connectToDB } from "@/utils/database";
import EuropaLocation from "@/models/europa_location";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const items = await EuropaLocation.find({ })

        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch items", { status: 500 })
    }
}
