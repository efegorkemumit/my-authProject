import React from 'react'
import Navbar from './_components/Navbar';


interface protectedLayoutProps{
    children: React.ReactNode;
}


const protectedLayout = ({children}:protectedLayoutProps) => {
  return (
    <div  className='    flex
    h-full 
    flex-col
    items-center
    justify-center
    bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400
'>
  <Navbar></Navbar>
{children}

    </div>
  )
}

export default protectedLayout