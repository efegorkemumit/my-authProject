import React from 'react'
import { Button } from '../ui/button'
import { FaGoogle, FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className='flex items-center w-full gap-9 '>
        
        <Button size="lg"
        className='w-full'
        variant="google"
        
    >
        <FaGoogle size={25}></FaGoogle>
        

        </Button>

        <Button size="lg"
        className='w-full'
        variant="github"
        
    >
        <FaGithub size={25}></FaGithub>
        

        </Button>
        
        
    </div>
  )
}

export default Social