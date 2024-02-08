import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { v4 as uuidv4} from 'uuid'

export const generateVerificationToken = async(email:string)=>{

    const token = uuidv4();

    const expires = new Date(new Date().getTime()+3600*1000)

    const extingToken = await getVerificationTokenByEmail(email);

    if(extingToken){
        await db.verificationToken.delete({
            where:extingToken.id
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