'use client'

import React, { useState, useTransition } from 'react'
import CardWrapper from './card-wrapper'
import ErrorForm from '../ErrorForm'
import SuccessForm from '../SuccessForm'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { RegisterSchema } from '@/schema'
import { register } from '@/action/register'

const RegisterForm = () => {

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransiton] = useTransition();


  const form = useForm<z.infer<typeof RegisterSchema>>({

    resolver: zodResolver(RegisterSchema),
    defaultValues:{
      email:"",
      password:"",
      name:"",
    }


  });


  const onSubmit = async (values: z.infer<typeof RegisterSchema>)=>{
    console.log(values);

    setError("");
    setSuccess("");

    startTransiton(()=>{
      register(values)
      .then((data)=>{
        setError(data.error);
        setSuccess(data.success)
      });


    });





  }


  return (
    <CardWrapper
   headerLabel="Create an Account"
   backButtonLabel="Already have an account"
   backButtonHref="/auth/login"
   showSocail
   >

    <Form {...form}>

      <form onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-4'>

        <div className=''>

        <FormField
          control={form.control}
          name="name"
          render={({field})=>(
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Name'
                type='text'
                disabled={isPending}
                {...field}>
                
                </Input>

              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />


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

        <FormField
          control={form.control}
          name="password"
          disabled={isPending}

          render={({field})=>(
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder='******'
                type='password'
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

export default RegisterForm