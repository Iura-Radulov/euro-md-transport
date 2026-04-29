import { withAuth } from "next-auth/middleware"

export default withAuth(

    function middleware(req) {
        console.log(req.nextauth.token)
    },
    {
        pages: {
            signIn: '/log-in',
            error: '/error',
        },
        callbacks: {
            authorized: ({ token }) => token?.role === "ADMIN",
        },
    }
)

export const config = {
    matcher: ['/panel'],
}
