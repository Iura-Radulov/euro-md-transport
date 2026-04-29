import { connectToDB } from "@/utils/database";
import MoldovaLocation from "@/models/moldova_location";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const items = await MoldovaLocation.find({ })

        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch users", { status: 500 })
    }
}
