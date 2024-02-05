import React from 'react'
import CardWrapper from './card-wrapper'

const LoginForm = () => {
  return (
   <CardWrapper
   headerLabel="Welcome"
   backButtonLabel="Dont have an Accout"
   backButtonHref="/auth/register"
   showSocail
   >


   </CardWrapper>
  )
}

export default LoginForm