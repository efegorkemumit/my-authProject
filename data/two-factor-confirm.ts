

import { db } from "@/lib/db";



export const getTwoFactorConfirmByUserId = async (userId:string)=>{

    try {

        const TwoFactorTokenConfirm = await db.twoFactorConfirmation.findUnique({
            where:{
                userId
            }
        })

        return TwoFactorTokenConfirm;
        
    } catch {
        return null;
        
    }


}