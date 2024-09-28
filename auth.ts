import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/client"

export const { handlers, signIn , signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma), //used by signIn object
    providers: [Google], //used by signIn object
    session: { //used by signIn object
        strategy: "jwt",
    },
    callbacks: { //used by auth object as a middleware that is exported from the middleware file
        authorized: (req) => { //req = request from the users
            //Logged in users are authenticated, otherwise redirect to the login page
            return !!req.auth //use !! to convert boolean and return as boolean
        }
    }
})