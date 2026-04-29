"use server";
import bcrypt from "bcrypt";
import {connectToDB} from "../utils/database";
import User from "../models/user";
import {RegisterSchema} from "../models/schemas";


export default async function register(values){
    console.log(values)
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    await connectToDB();
    const userExists = await User.findOne({email: email})
    if (userExists) {
        return { error: "Email already in use!" };
    }
    await User.create({
        email: email,
        username: name,
        password: hashedPassword,
        role: "USER"
    })

    return { success: "Confirmation email sent!" };
    }
