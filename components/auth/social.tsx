import React from 'react'
import { Button } from '../ui/button'
import { FaGoogle, FaGithub } from "react-icons/fa";

const Social = () => {
  return (
    <div className='flex items-center w-full gap-9 '>
        
        <Button size="lg"
        className='w-full'
        variant="outline"
        
    >
        <FaGoogle></FaGoogle>
        

        </Button>

        <Button size="lg"
        className='w-full'
        variant="outline"
        
    >
        <FaGithub></FaGithub>
        

        </Button>
        
        
    </div>
  )
}

export default Social