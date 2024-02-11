import { ExtendedUser } from '@/next-env'
import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';

interface UserInfoDetailPageProps{
    user? : ExtendedUser;
    label:string;
}

const UserInfoDetailPage = ({user, label}:UserInfoDetailPageProps) => {
  return (
 

    <Card className='w-[550px] shadow-xl'>

        <CardHeader> 
            <p className='text-2xl font-light text-center'>{label}</p>
        </CardHeader>

        <CardContent className='space-y-5'>
            <div className='flex flex-row items-center justify-between rounded-lg
                     p-3 '>
                <p>ID</p>
                <p className='truncate bg-slate-100 p-1 max-w-52 text-xs'>
                    {user?.id}</p>

            </div>

            <div className='flex flex-row items-center justify-between rounded-lg
                     p-3 '>
                <p>Name</p>
                <p className='truncate bg-slate-100 p-1 max-w-52 text-xs'>
                    {user?.name}</p>

            </div>

            <div className='flex flex-row items-center justify-between rounded-lg
                     p-3 '>
                <p>Email</p>
                <p className='truncate bg-slate-100 p-1 max-w-52 text-xs'>
                    {user?.email}</p>

            </div>

            <div className='flex flex-row items-center justify-between rounded-lg
                     p-3 '>
                <p>Role</p>
                <p className='truncate bg-slate-100 p-1 max-w-52 text-xs'>
                    {user?.role}</p>

            </div>

            <div className='flex flex-row items-center justify-between rounded-lg
                     p-3 '>
                <p>2FA AUTH</p>
               
               <Badge 
               variant={user?.isTwoFactorEnabled ? "success" :"destructive"}>
                    {user?.isTwoFactorEnabled ? "ON" :"OFF"}
                    </Badge>

            </div>





        </CardContent>



    </Card>
  )
}

export default UserInfoDetailPage