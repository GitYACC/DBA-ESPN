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
                    return user as any
                }

                return { error: "incorrect credentials" } as any
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
           if((user as any).error === "incorrect credentials") {
              return `?error=${(user as any).error}`
           }
           
           return true
        }
     }
}

export default NextAuth(authOptions)
