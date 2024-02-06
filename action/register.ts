'use server'

import * as z from 'zod';
import { RegisterSchema } from '@/schema'
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserEmail } from '@/data/user';


export const register = async(values: z.infer<typeof RegisterSchema>)=>{

    const validateField = RegisterSchema.safeParse(values);

    if(!validateField.success){
        return {error : "Invalid fields !"}


    }


    const {email, password, name} = validateField.data;

    const hasHedpassword  = await bcrypt.hash(password, 10);

    const exitingUser = await getUserEmail(email);

    if(exitingUser){
        return {error : "email is already !"}

    }

    await db.user.create({
        data:{
            name, 
            email,
            password: hasHedpassword
        }
    })

    return {success : "Email sent"}





}