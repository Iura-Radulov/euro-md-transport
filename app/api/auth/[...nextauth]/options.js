import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcrypt";

export const authOptions = {
    pages: {
        signIn: '/',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        CredentialsProvider ({
            async authorize(credentials) {
                const user = await User.findOne({email: credentials.email});
                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.password,
                );

                if (passwordsMatch) return user;
                return null;
            },
        })
    ],
    callbacks: {
        async session({session, token}) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email;
                if (token.role) session.user.role = token.role;
                if (token.about) session.user.about = token.about;
                if (token.phone) session.user.phone = token.phone;
                if (token.birthday) session.user.birthday = token.birthday;
                if (token.cityId) session.user.cityId = token.cityId;
                if (token.account) session.user.account = token.account;
                if (token.image) session.user.image = token.image;
                if (token.categories) session.user.categories = token.categories;
                if (token.experience) session.user.experience = token.experience;
            }
            return session;
        },
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider !== "credentials") {
                    await connectToDB();
                    const userExists = await User.findOne({email: profile.email});
                    let profileName = '';
                    if (profile.iss === 'https://accounts.google.com') {
                        profileName = 'google';
                    }
                    if (!userExists) {
                        await User.create({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                            role: "USER",
                            account: profileName
                        });
                    }
                }
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        authorized({ req , token }) {
            if (token) return true;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            const existingUser = await User.findOne({email: token.email});
            if (!existingUser) return token;

            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role;
            token.phone = existingUser.phone;
            token.image = existingUser.image;

            return token;
        }
    },
    session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60, updateAge: 24 * 60 * 60 },
    secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
};
