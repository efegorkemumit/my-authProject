'use client'

import { useCurrentRole } from '@/hooks/use-current-role';
import { UserRole } from '@prisma/client'
import React from 'react'
import ErrorForm from './ErrorForm';

interface RoleGateProps{
    children:React.ReactNode,
    allowedRole : UserRole;

}

const RoleGate = ({allowedRole, children}:RoleGateProps) => {

    const role = useCurrentRole();
    if(role !== allowedRole){

        return
        <ErrorForm message='You dont have permissiosn'></ErrorForm>

    }
  return (
    <>
    {children}
  </>
  )
}

export default RoleGate