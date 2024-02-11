'use client'
import UserButtonProfile from '@/components/auth/userButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

  const pathname = usePathname();
  return (
    <nav className='bg-slate-300 flex justify-between
    items-center p-4 rounded-lg shadow-sm w-[550px]'>

      <div className='flex gap-x-3'>

        <Button asChild 
        variant={pathname ==="/server" ? "default" : "outline"}
        >

          <Link href="/server"> Server</Link>

        </Button>

        <Button asChild 
        variant={pathname ==="/client" ? "default" : "outline"}
        >

          <Link href="/client"> Client</Link>

        </Button>


        <Button asChild 
        variant={pathname ==="/settings" ? "default" : "outline"}
        >

          <Link href="/settings"> Setting</Link>

        </Button>


        <Button asChild 
        variant={pathname ==="/admin" ? "default" : "outline"}
        >

          <Link href="/admin"> Admin</Link>

        </Button>




      </div>
      <UserButtonProfile></UserButtonProfile>



    </nav>
  )
}

export default Navbar