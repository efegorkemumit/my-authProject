'use client'
import UserInfoDetailPage from '@/components/userInfo';
import { useCurrentUser } from '@/hooks/use-current-user';
import React from 'react'

const Clientpage = () => {
  const user = useCurrentUser();
  return (
    <div>

      <UserInfoDetailPage
      label='Client Component'
      user={user}></UserInfoDetailPage>



    </div>
  )
}

export default Clientpage