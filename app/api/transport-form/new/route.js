import { connectToDB } from "@/utils/database";
import TransportForm from "@/models/transport_form";

export const POST = async (request) => {
    const { fromDestination, toDestination, phone } = await request.json();

    try {
        await connectToDB();


        const newItem = new TransportForm({
            fromDestination,
            toDestination,
            phone,

        });

        await newItem.save();
        return new Response(JSON.stringify(newItem), { status: 201, body: JSON.stringify(newItem) });
    } catch (error) {
        return new Response("Failed to create a form request", { status: 500 });
    }
}
