'use client'
import React, { useCallback, useEffect, useState } from 'react'
import CardWrapper from './card-wrapper'
import { useSearchParams } from 'next/navigation';
import { newVerification } from '@/action/new-verify';
import BeatLoader from "react-spinners/BeatLoader";
import SuccessForm from '../SuccessForm';
import ErrorForm from '../ErrorForm';


const VerifyForm = () => {

  const [error, setError] = useState<string | undefined>();
  const [success, setSucccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(()=>{
    if(success || error ) return;

    if(!token){
      setError("Missing Token!");
      return;
    }

    newVerification(token)
    .then((data)=>{
      setSucccess(data.success);
      setError(data.error)
    })
    .catch(()=>{
      setError("Something wrong")
    })
  }, [token, success, error])

  useEffect(()=>{
    onSubmit();
  }, [onSubmit]);



  return (

    <CardWrapper 
    headerLabel='Confirm your verification'
    backButtonLabel='back to login'
    backButtonHref='/auth/login'
    
    >
        <div className='flex items-center w-full justify-center'>
          {!success && !error &&(
            <BeatLoader></BeatLoader>
          )}
          <SuccessForm message={success}/>
          {!success &&(
            <ErrorForm message={error}/>
          )}

        </div>



    </CardWrapper>



    )
}

export default VerifyForm