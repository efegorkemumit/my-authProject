import Google from "next-auth/providers/google"
import Github from "next-auth/providers/github"

import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schema"
import { getUserEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
        async authorize(credentials){
            const validateFiels = LoginSchema.safeParse(credentials);

            if(validateFiels.success){
                const {email, password} = validateFiels.data


                const user = await getUserEmail(email)

                if(!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(
                    password,
                    user.password,
                );

                if(passwordMatch) return user;


                return null;

            }
        }
    })




  ]
} satisfies NextAuthConfig