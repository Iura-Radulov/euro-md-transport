import { connectToDB } from "@/utils/database";
import TransportForm from "@/models/transport_form";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const items = await TransportForm.find({ })

        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch items", { status: 500 })
    }
}
