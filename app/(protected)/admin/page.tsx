'use client'

import { admin } from '@/action/admin'
import SuccessForm from '@/components/SuccessForm'
import RoleGate from '@/components/role-gate'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { UserRole } from '@prisma/client'
import React from 'react'
import { toast } from 'sonner'

const AdminPage = () => {

    

    const onApiRouteClick = ()=>{
        fetch("/api/admin")
        .then((response)=>{
            if(response.ok){
                toast.success("Allowed api")
            }
            else{
                toast.error("Forbidden Api");
            }
        })
    }


    const onServerActionClick = ()=>{
        admin()
        .then((data)=>{

            if(data.error){
                toast.error(data.error)
            }
            if(data.success){
                toast.success(data.success)
            }
        })

    }
    




  return (
   <Card className='w-[550px]'>
    <CardHeader>
        <p className='text-2xl text-center'>Admin</p>
    </CardHeader>

    <CardContent className='space-y-4'>
        <RoleGate allowedRole={UserRole.ADMIN}>
            <SuccessForm
            message='You are allowed. it is okey'></SuccessForm>

        </RoleGate>

        <div className='flex flex-row items-center justify-between
        rounded-lg border p-3'>

            <p className='text-sm'> Admin ony api route</p>

            <Button onClick={onApiRouteClick}> Click to test</Button>


        </div>

        <div className='flex flex-row items-center justify-between
        rounded-lg border p-3'>

            <p className='text-sm'> Admin ony Server Action</p>

            <Button onClick={onServerActionClick}> Click to test</Button>


        </div>

        


    </CardContent>
   </Card>
  )
}

export default AdminPage