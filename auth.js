import NextAuth from "next-auth"
import User from "@/models/user";
import authConfig from "@/auth.config";
import {connectToDB} from "./utils/database";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
    update,
} = NextAuth({

    events: {
        async linkAccount({ user }) {
            await User.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider !== "credentials") {
                    await connectToDB();
                    const userExists = await User.findOne({email: profile.email})
                    console.log('userExists', userExists)
                    console.log('profile', profile)
                    if(!userExists) {
                        await User.create({
                            email: profile.email,
                            name: profile.name,
                            image: profile.picture,
                            role: "USER"
                        })
                        // }  else {
                        //     console.log('credentials', credentials)
                        //     await User.create({
                        //         email: credentials.email,
                        //         username: credentials.name,
                        //         role: "USER"
                        //     })
                    }
                }
                return true
            } catch (e) {
                console.log(e)
                return false;
            }
        },
        async session({ token, session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            session.user.id=sessionUser._id.toString();
            session.user.about=sessionUser.about;
            session.user.name=sessionUser.name;
            // if (session.user) {
            //     session.user.name = token.name;
            //     session.user.email = token.email;
            //     // session.user.isOAuth = token.isOAuth;
            // }
            return session;
        },
        async jwt({ token }) {
            // if (!token.sub) return token;
            //
            // const existingUser = await getUserById(token.sub);
            //
            // if (!existingUser) return token;
            //
            // const existingAccount = await getAccountByUserId(
            //     existingUser.id
            // );
            //
            // token.isOAuth = !!existingAccount;
            // token.name = existingUser.name;
            // token.email = existingUser.email;
            // token.role = existingUser.role;
            // token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
            //
            // return token;
        }
    },
    // adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
