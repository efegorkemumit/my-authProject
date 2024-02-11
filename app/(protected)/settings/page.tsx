'use client'
import { logout } from '@/action/logout'
import { auth, signOut } from '@/auth'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

const SettingsPage = () => {

  const user = useCurrentUser();

  const onClick = ()=>{
    logout();
  }
  return (
    <div className='bg-white p-4 rounded-xl'>
      <button onClick={onClick}>
        Sign out
      </button>

    </div>
  )
}

export default SettingsPage