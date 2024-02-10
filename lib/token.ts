import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4} from 'uuid'
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";

export const generateVerificationToken = async(email:string)=>{

    const token = uuidv4();

    const expires = new Date(new Date().getTime()+3600*1000)

    const extingToken = await getVerificationTokenByEmail(email);

    if(extingToken){
        await db.verificationToken.delete({
            where: {
                id: extingToken.id
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires,
        }
    })


    return verificationToken;






}


export const generatePasswordToken = async(email:string)=>{

    const token = uuidv4();

    const expires = new Date(new Date().getTime()+3600*1000)

    const extingToken = await getPasswordResetTokenByEmail(email);

    if(extingToken){
        await db.passwordResetToken.delete({
            where: {
                id: extingToken.id
            }
        })
    }

    const passwordToken = await db.passwordResetToken.create({
        data:{
            email,
            token,
            expires,
        }
    })


    return passwordToken;






}