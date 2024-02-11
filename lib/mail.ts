import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendVerificationEmail = async (email:string,token: string)=>{


    const cofirmLinkAddress = `http://localhost:3000/auth/new-verify?token=${token}`;


    await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Confirm your email Address',
        html: `<p>Click <a href="${cofirmLinkAddress}"> here </a>  confrim to email </p> `
      });



}



export const sendResetPasswordEmail = async (email:string,token: string)=>{


  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;


  await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Click <a href="${resetLink}"> here </a>  reset a passsword </p> `
    });



}



export const sendTwoFactorTokenEmail = async (email:string,token: string)=>{

  await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '2FA CODE',
      html: `<p>   Your 2fa Code  ${token} </p> `
    });



}



