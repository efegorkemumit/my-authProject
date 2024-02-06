import GitHub from "next-auth/providers/github"
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthConfig } from "next-auth"
import { LoginSchema } from "./schema"
import { getUserEmail } from "./data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [

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