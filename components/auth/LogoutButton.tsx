import { logout } from '@/action/logout'
import React from 'react'

interface LogoutButtonProps{
    children?: React.ReactNode
}

const LogoutButton = ({children}: LogoutButtonProps) => {

    const onClick= ()=>{
        logout();
    }
  return (
    <span onClick={onClick} className='cursor-pointer'>

        {children}
    </span>
  )
}

export default LogoutButton