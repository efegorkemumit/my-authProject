'use client'
import UserInfoDetailPage from '@/components/userInfo'
import { useCurrentUser } from '@/hooks/use-current-user'
import React from 'react'

const SerVerPage = () => {

  const user = useCurrentUser();
  return (
    <div>

      <UserInfoDetailPage
      label='Server Component'
      user={user}></UserInfoDetailPage>



    </div>
  )
}

export default SerVerPage