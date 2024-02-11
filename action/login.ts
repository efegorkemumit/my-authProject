'use server'

import * as z from 'zod';
import { LoginSchema } from '@/schema'
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';
import { getUserEmail } from '@/data/user';
import { generateTwoFactorToken, generateVerificationToken } from '@/lib/token';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorTokenEmail } from '@/data/two-factor-token';
import { getTwoFactorConfirmByUserId } from '@/data/two-factor-confirm';
import { db } from "@/lib/db";


export const login = async(values: z.infer<typeof LoginSchema>)=>{

    const validateField = LoginSchema.safeParse(values);

    if(!validateField.success){
        return {error : "Invalid fields !"}


    } 

    const {email, password, code} = validateField.data;


    const exitingUser = await getUserEmail(email);

    if(!exitingUser || !exitingUser.email || !exitingUser.password)
    {
      return {error: "email does not exitis"}
    }

    if(!exitingUser.emailVerified){

      const verificationtoken = await generateVerificationToken(
        exitingUser.email
      );

      await sendVerificationEmail(
        verificationtoken.email,
        verificationtoken.token,
      )

      return {success : "Confirm Email sent"}
 
    }

    if(exitingUser.isTwoFactorEnabled && exitingUser.email){
      if(code)
      {
        const twoFactorToken = await getTwoFactorTokenEmail(exitingUser.email);

        if(!twoFactorToken){
          return {error : "Invalid Code"}
        }

        if(twoFactorToken.token !==code){
          return {error : "Invalid Code"}
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if(hasExpired){
          return {error : "Code expired"}

        }

        await db.twoFactorToken.delete({
          where : { id : twoFactorToken.id}
        })

        const existingConfirmation = await getTwoFactorConfirmByUserId(
          exitingUser.id
        );

        if(existingConfirmation){
          await db.twoFactorConfirmation.delete({
            where:{id:existingConfirmation.id}
          })
        }

        await db.twoFactorConfirmation.create({
          data:{
            userId: exitingUser.id
          }
        });

      }
      else{

        const twoFactorToken = await generateTwoFactorToken(exitingUser.email)
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return {twoFactor : "true"}


      }



    }














    try {
        await signIn("credentials", {
          email,
          password,
          redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid credentials!" }
            default:
              return { error: "Something went wrong!" }
          }
        }
    
        throw error;
      }







}