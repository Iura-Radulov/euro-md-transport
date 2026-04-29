import { connectToDB } from "@/utils/database";

import City from "@/models/city";
export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const cities = await City.find({ })

        return new Response(JSON.stringify(cities), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch cities", { status: 500 })
    }
}
