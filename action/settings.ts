"use server"

import { getUserById, getUserEmail } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { SettingsSchema } from "@/schema";
import * as z from 'zod';
import bcrypt from "bcryptjs";
import { update } from "@/auth";



export const settings = async(values:z.infer<typeof SettingsSchema>)=>{

    const user  = await currentUser();

    if(!user){
        return { error : "Unauhtorized"};
    }

    const dbUser = await getUserById(user.id)

    if(!dbUser){
        return { error : "Unauhtorized"};
    }

    if(user.isOAuth){
        values.email=undefined;
        values.password= undefined;
        values.newPassword= undefined;
        values.isTwoFactorEnabled=undefined
    }


        //  Email
    if(values.email && values.email !== user.email){

        const exitignUser = await getUserEmail(values.email);

        if(exitignUser && exitignUser.id !==user.id){
            return {error: "Email is already"}
        }

        const verifactionToken = await generateVerificationToken(values.email);

        await sendVerificationEmail(
            verifactionToken.email,
            verifactionToken.token
        )

        return {success: "Email is sent verifiation"};

    }

      //  password
    if(values.password && values.newPassword && dbUser.password){

        const passwordMatch = await bcrypt.compare(
            values.password, 
            dbUser.password
        )

        if(!passwordMatch){
            return { error : "Wrong Password"};
        }

        const hasHedpassword = await bcrypt.hash(
            values.newPassword, 10
        )

        values.password = hasHedpassword;
        values.newPassword = undefined
    }

    const updatedUser = await db.user.update({
        where: { id: dbUser.id },
        data: {
          ...values,
        }
      });
    
      update({
        user: {
          name: updatedUser.name,
          email: updatedUser.email,
          isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
          role: updatedUser.role,
        }
      });


    return {success : "it is okey"};



}