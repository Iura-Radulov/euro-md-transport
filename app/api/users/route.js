import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const users = await User.find({ })

        return new Response(JSON.stringify(users), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch users", { status: 500 })
    }
}
