import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';

interface BackButtonProps{
    href:string;
    label:string
}

const BackButton = ({label, href} :BackButtonProps) => {
  return (
    <Button variant="link" asChild className='w-full font-normal '>
        <Link href={href}>
        {label}
             </Link>
      
    </Button>
  )
}

export default BackButton