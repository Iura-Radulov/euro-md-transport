import { connectToDB } from "@/utils/database";
import Category from "@/models/category";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const cities = await Category.find({ })

        return new Response(JSON.stringify(cities), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch items", { status: 500 })
    }
}
