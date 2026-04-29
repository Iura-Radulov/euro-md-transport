import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const POST = async (request) => {
    const { name, email, password, role } = await request.json();

    try {
        await connectToDB();

        const passwordHash = await bcrypt.hash(password, 10);
        const newItem = new User({
            name,
            email,
            password: passwordHash,
            role
        });

        await newItem.save();
        return new Response(JSON.stringify(newItem), { status: 200, body: JSON.stringify(newItem) });
    } catch (error) {
        return new Response("Failed to create a new user", { status: 500 });
    }
}
