"use server";
import bcrypt from "bcrypt";
import {connectToDB} from "../utils/database";
import User from "../models/user";
import {LoginSchema} from "../models/schemas";
import {signIn} from "next-auth/react";


export default async function login(values) {
    console.log(values)
    const validatedFields = LoginSchema.safeParse(values);
    if (!validatedFields.success) {
        return false;
    }

    const {email} = validatedFields.data;

    await connectToDB();
    const userExists = await User.findOne({email: email})
    if (!userExists) {
        return false;
    }
    return userExists.role === 'ADMIN';

    // try {
    //
    //     await signIn("credentials",{
    //         redirect:false,
    //          email,
    //          password,
    //         // redirectTo: '/',
    //     }
    //     )
    // } catch (error) {
    //     if (error ) {
    //
    //         switch (error.type) {
    //             case "CredentialsSignin":
    //                 return {error: "Invalid credentials!"}
    //             default:
    //                 return {error: "Something went wrong!"}
    //         }
    //     }
    // }
}
