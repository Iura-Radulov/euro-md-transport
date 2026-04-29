import { connectToDB } from "@/utils/database";
import City from "@/models/city";

export const POST = async (request) => {
    const { nameEn, nameRo, nameRu } = await request.json();

    try {
        await connectToDB();

        const newCity = new City({ nameEn, nameRo, nameRu });

        await newCity.save();
        return new Response(JSON.stringify(newCity), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new city", { status: 500 });
    }
}
