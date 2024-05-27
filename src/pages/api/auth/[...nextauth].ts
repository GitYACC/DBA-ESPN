import { NextApiRequest, NextApiResponse } from "next"
import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth, { NextAuthOptions, User } from "next-auth"
import { encode, decode, getToken } from 'next-auth/jwt';
import { prisma } from "../_base";
import { useRouter } from "next/navigation";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials, req) {
                const user = await prisma.users.findFirst({
                    where: {
                        username: credentials?.username as string,
                        password: credentials?.password as string
                    }
                })

                if (user) {
                    return user
                }

                return { error: "incorrect credentials" }
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
           if(user?.error === "incorrect credentials") {
              return `?error=${user?.error}`
           }
           
           return true
        }
     }
}

export default NextAuth(authOptions)
