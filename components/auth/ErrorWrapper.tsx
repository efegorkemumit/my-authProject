import React from 'react'
import CardWrapper from './card-wrapper'
import { MdDangerous } from "react-icons/md";

const ErrorWrapper = () => {
  return (
    <CardWrapper 
    headerLabel='Oppppss!! Something went wrong'
    backButtonHref='/auth/login'
    backButtonLabel='back to login'

    
    
    >

        <div className='w-full items-center justify-center
        flex text-red-700'>
        <MdDangerous  size={100} />
        </div>
      


    </CardWrapper>


  )
}

export default ErrorWrapper