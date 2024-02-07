import React from 'react'
import { Button } from '../ui/button'
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

const Social = () => {

  const onClick =(provider : "google" | "github")=>{
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });


  }
  return (
    <div className='flex items-center w-full gap-9 '>
        
        <Button size="lg"
        className='w-full'
        variant="google"
        onClick={()=>onClick("google")}
        
    >
        <FaGoogle size={25}></FaGoogle>
        

        </Button>

        <Button size="lg"
        className='w-full'
        variant="github"
        onClick={()=>onClick("github")}

        
    >
        <FaGithub size={25}></FaGithub>
        

        </Button>
        
        
    </div>
  )
}

export default Social