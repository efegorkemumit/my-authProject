import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { FaUser } from 'react-icons/fa';
import LogoutButton from './LogoutButton';
import { IoIosExit } from "react-icons/io";

const UserButtonProfile = () => {

    const user = useCurrentUser();
  return (
   <DropdownMenu>
    <DropdownMenuTrigger>
        <Avatar>
            <AvatarImage src={user?.image || ""} ></AvatarImage>
            <AvatarFallback className='bg-sky-500'>
                <FaUser className='text-white'></FaUser>
            </AvatarFallback>

        </Avatar>
    </DropdownMenuTrigger>

    <DropdownMenuContent>
        <LogoutButton>

            <DropdownMenuItem>
                
            <IoIosExit className='h-4 w-4 mr-2' />
            Logout


            </DropdownMenuItem>


        </LogoutButton>


    </DropdownMenuContent>
   </DropdownMenu>
  )
}

export default UserButtonProfile