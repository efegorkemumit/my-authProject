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
import { ResetSchema } from '@/schema';
import { useForm } from 'react-hook-form';
import { reset } from '@/action/reset';


const ResetForm = () => {

    const [error, setError] = useState<string | undefined>("")
    const [success, setSuccess] = useState<string | undefined>("")
    const [isPending, startTransiton] = useTransition();

    const form = useForm<z.infer<typeof ResetSchema>>({

        resolver: zodResolver(ResetSchema),
        defaultValues:{
          email:"",
          password:"",
        }
    
    
      });

    const onSubmit = async (values: z.infer<typeof LoginSchema>)=>{
        console.log(values);

        setError("");
        setSuccess("");

        startTransiton(()=>{
          reset(values)
          .then((data)=>{
            setError(data?.error);
            setSuccess(data?.success)
          })
        })

    }

  return (
    <CardWrapper headerLabel='Forgot your Password'
    backButtonLabel='Back to login'
    backButtonHref='/auth/login'>


<Form {...form}>

<form onSubmit={form.handleSubmit(onSubmit)}
className='space-y-4'>

  <div className=''>
  <FormField
          control={form.control}
          name="email"
          render={({field})=>(
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='email'
                type='email'
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
            Login

          </Button>
 
    </div>

</form>
</Form>


    </CardWrapper>
  )
}

export default ResetForm