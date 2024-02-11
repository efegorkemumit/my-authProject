import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmByUserId } from "./data/two-factor-confirm"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  pages:{
    signIn:"/auth/login",
    error:"/auth/error"
  },
  events:{

    async linkAccount({user}){
      await db.user.update({
        where : {id: user.id},
        data: {emailVerified: new Date()}
      })
    }


  },

    callbacks:{

      async signIn({user, account}){

        if(account?.provider !=="credentials")  return true;

        const exitingUser = await getUserById(user.id)

        if(!exitingUser?.emailVerified) return false;

        if(exitingUser.isTwoFactorEnabled){

          const twoFactorConfirmation = await getTwoFactorConfirmByUserId(exitingUser.id);

          if(!twoFactorConfirmation) return false;

          await db.twoFactorConfirmation.delete({
            where: {id:twoFactorConfirmation.id}
          })

        }


        return true;




      },

      async session({token, session})
      {

        if(token.sub && session.user){
          session.user.id = token.sub;
        }

        if(token.role && session.user){
          session.user.role = token.role as UserRole;
        }

        if(session.user){
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        }


        return session;


      },

      async jwt({token}){
        if(!token.sub)  return token;

        const exitingUser = await getUserById(token.sub)

        if(!exitingUser)  return token;

        token.role = exitingUser.role

        token.isTwoFactorEnabled = exitingUser.isTwoFactorEnabled;


        return token;
      }

    },

    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,

})