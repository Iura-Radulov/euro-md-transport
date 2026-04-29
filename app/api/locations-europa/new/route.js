import { connectToDB } from "@/utils/database";
import EuropaLocation from "@/models/europa_location";
import bcrypt from "bcrypt";

export const POST = async (request) => {
    const { nameEn, nameRo, nameRu } = await request.json();

    try {
        await connectToDB();


        const newItem = new EuropaLocation({
            nameEn,
            nameRo,
            nameRu
        });

        await newItem.save();
        return new Response(JSON.stringify(newItem), { status: 200, body: JSON.stringify(newItem) });
    } catch (error) {
        return new Response("Failed to create a new item", { status: 500 });
    }
}
