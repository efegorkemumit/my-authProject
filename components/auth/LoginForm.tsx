'use client'

import React from 'react'
import CardWrapper from './card-wrapper'
import ErrorForm from '../ErrorForm'
import SuccessForm from '../SuccessForm'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schema'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


const LoginForm = () => {

  const form = useForm<z.infer<typeof LoginSchema>>({

    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      pasword:"",
    }


  });


  const onSubmit = (values: z.infer<typeof LoginSchema>)=>{
    console.log(values);
  }


  return (
   <CardWrapper
   headerLabel="Welcome"
   backButtonLabel="Dont have an Accout"
   backButtonHref="/auth/register"
   showSocail
   >

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
                {...field}>
                
                </Input>

              </FormControl>
              <FormMessage/>
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="password"
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
          
          <ErrorForm message=''></ErrorForm>
          <SuccessForm message=''></SuccessForm>

          <Button
          type='submit'
          className='w-full mt-2'>
            Login

          </Button>





        </div>

      </form>



    </Form>

   


   </CardWrapper>
  )
}

export default LoginForm