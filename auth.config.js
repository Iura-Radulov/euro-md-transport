import bcrypt from "bcrypt";

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";


// export const authConfig = {
//     pages: {
//         signIn: '/log-in',
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user;
//             const isOnDashboard = nextUrl.pathname.startsWith('/panel');
//             if (isOnDashboard) {
//                 if (isLoggedIn) return true;
//                 return false; // Redirect unauthenticated users to login page
//             } else if (isLoggedIn) {
//                 return Response.redirect(new URL('/panel', nextUrl));
//             }
//             return true;
//         },
//     },
//     providers: [], // Add providers with an empty array for now
// };

export default {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials,res) {
                console.log('authorize')
                console.log('credentials', credentials)

                // const validatedFields = LoginSchema.safeParse(credentials);

                // if (validatedFields.success) {
                // const { email, password } = validatedFields.data;

                const user = await User.findOne({email: credentials.email});
                if (!user || !user.password) return null;

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.password,
                );

                if (passwordsMatch) return user;
                // }

                return null;
            },
            secret: process.env.SECRET,
        })
    ],
}
