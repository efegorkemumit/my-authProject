import React from 'react'

interface AuthLayoutProps{
    children: React.ReactNode
}

const layout = ({ children}: AuthLayoutProps) => {
  return (
    <div  className='    flex
    h-full 
    flex-col
    items-center
    justify-center
    bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-400
'>
{children}

    </div>
  )
}

export default layout