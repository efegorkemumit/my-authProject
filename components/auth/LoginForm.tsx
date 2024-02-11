'use client'

import React, { useState, useTransition } from 'react'
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
import { login } from '@/action/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'


const LoginForm = () => {

  const searchParams = useSearchParams();

  const UrlError = searchParams.get("error") =="OAuthAccountNotLinked"
  ? "Another account already exists with the same e-mail address"
  : ""

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransiton] = useTransition();

  const [showTwoFactor, setShowTwoFactor] = useState(false);


  const form = useForm<z.infer<typeof LoginSchema>>({

    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email:"",
      password:"",
      code:"",
    }


  });


  const onSubmit = async (values: z.infer<typeof LoginSchema>)=>{
    console.log(values);

    setError("");
    setSuccess("");

    startTransiton(()=>{
      login(values)
      .then((data)=>{

        if(data?.error){
          form.reset();
          setError(data.error)

        }

        if(data?.success){
          form.reset();
          setError(data.success)
          
        }

        if(data?.twoFactor){
          setShowTwoFactor(true);
        }



      })
      .catch(()=>setError("Something went wrong"))


    });





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


{showTwoFactor && (

<FormField
control={form.control}
name="code"
render={({field})=>(
  <FormItem>
    <FormLabel>2FA CODE </FormLabel>
    <FormControl>
      <Input placeholder='123456'
      disabled={isPending}
      {...field}>
      
      </Input>

    </FormControl>
    <FormMessage/>
  </FormItem>
)} />


)} 



{!showTwoFactor && (
<>

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

render={({field})=>(
  <FormItem>
    <FormLabel>Password</FormLabel>
    <FormControl>
      <Input placeholder='******'
      type='password'
      disabled={isPending}

      {...field}>
      
      </Input>

    </FormControl>

    <Button variant="link" className='px-0 font-normal' asChild>
     
     <Link href="/auth/reset">

     Forget Password
     </Link> 
      
      
      </Button>



    <FormMessage/>
  </FormItem>
)} />



</>
)} 


        




          
          <ErrorForm message={error || UrlError}></ErrorForm>
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

export default LoginForm