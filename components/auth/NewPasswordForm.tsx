'use client'

import React, { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CardWrapper from './card-wrapper'
import ErrorForm from '../ErrorForm'
import SuccessForm from '../SuccessForm'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { NewPasswordSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { reset } from '@/action/reset';
import { newPassword } from '@/action/new-password';
import { useSearchParams } from 'next/navigation';


const NewPasswordForm = () => {

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransiton] = useTransition();


  const form = useForm<z.infer<typeof NewPasswordSchema>>({

    resolver: zodResolver(NewPasswordSchema),
    defaultValues:{
      password:"",
    }


  });

const onSubmit = async (values: z.infer<typeof NewPasswordSchema>)=>{
    console.log(values);

    setError("");
    setSuccess("");

    startTransiton(()=>{
      newPassword(values, token)
      .then((data)=>{
        setError(data?.error);
        setSuccess(data?.success)
      })
    })

}


  return (
    <CardWrapper headerLabel='Enter a new password'
    backButtonLabel='Back to login'
    backButtonHref='/auth/login'>


<Form {...form}>

<form onSubmit={form.handleSubmit(onSubmit)}
className='space-y-4'>

  <div className=''>
  <FormField
          control={form.control}
          name="password"
          render={({field})=>(
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='Password'
                type='password'
                disabled={isPending}
                {...field}>
                
                </Input>

              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

            <ErrorForm message={error}></ErrorForm>
          <SuccessForm message={success}></SuccessForm>

          <Button
          type='submit'
          disabled={isPending}
          className='w-full mt-2'>
            Save

          </Button>
 
    </div>

</form>
</Form>


    </CardWrapper>
  )
}

export default NewPasswordForm