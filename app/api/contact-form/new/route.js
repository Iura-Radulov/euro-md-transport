import { connectToDB } from "@/utils/database";
import ContactForm from "@/models/contact_form";
import {sentContactForm} from "@/actions/sentBot";

export const POST = async (request) => {
    const { name, phone, message } = await request.json();

    try {
        await connectToDB();


        const newItem = new ContactForm({
            name,
            phone,
            message
        });

        await newItem.save();
        await sentContactForm(newItem);
        return new Response(JSON.stringify(newItem), { status: 201, body: JSON.stringify(newItem) });
    } catch (error) {
        return new Response("Failed to create a form request", { status: 500 });
    }
}
