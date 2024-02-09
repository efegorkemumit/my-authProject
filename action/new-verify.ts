'use server'

import { getUserEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";


export const newVerification = async(token:string)=>{

    const exitingToken= await getVerificationTokenByToken(token)

    if(!exitingToken){
        return {error : "Token does not exist"}
    }
    
    const hasExpired  = new Date(exitingToken.expires) < new Date();


    if(hasExpired)
    {
        return {error : "Token has expired"}
    }

    const exitignUser = await getUserEmail(exitingToken.email)

    if(!exitignUser){
        return {error : "Email does not exist"}
    }


    await db.user.update({
        where: {id:exitignUser.id},
        data:{
            emailVerified:new Date(),
            email:exitingToken.email
        }
    })

    await db.verificationToken.delete({
        where:{id:exitingToken.id}
    })

    return {success : "Email verified"}



}