import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
// Import your providers here

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [

    ]
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    // Deal with request before passing to authentication

    /* 
    ┌─────────┐
    │ EXAMPLE │
    └─────────┘

    if (req.query.nextauth?.includes("callback") && req.method === "POST") {
        // Handle callback request during POST
    }

    const value = req.cookies["cookie"]
    */

    return await NextAuth(req, res, {
        ...authOptions,
        /*
        callbacks: {
            session({ session, token }) {
                session.value = value
                return session
            }
        }
        */
    })
}