import { connectToDB } from "@/utils/database";
import ContactForm from "@/models/contact_form";

export const dynamic = 'force-dynamic';

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const items = await ContactForm.find({ })

        return new Response(JSON.stringify(items), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch items", { status: 500 })
    }
}
