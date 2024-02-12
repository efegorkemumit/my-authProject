'use client'
import { logout } from '@/action/logout'
import { settings } from '@/action/settings'
import { auth, signOut } from '@/auth'
import ErrorForm from '@/components/ErrorForm'
import SuccessForm from '@/components/SuccessForm'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectItem, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useCurrentUser } from '@/hooks/use-current-user'
import { SettingsSchema } from '@/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { SelectContent, SelectTrigger } from '@radix-ui/react-select'
import { useSession } from 'next-auth/react'
import React, { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CiSettings } from "react-icons/ci";

const SettingsPage = () => {

  const user = useCurrentUser();

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransiton] = useTransition();

  const {update} = useSession();


  const form = useForm<z.infer<typeof SettingsSchema>>({

    resolver: zodResolver(SettingsSchema),
    defaultValues:{
      name: user?.name || undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
      role: user?.role || undefined,
      email: user?.email || undefined,
      password:undefined,
      newPassword: undefined,
    }


  });

  const onSubmit = (values: z.infer<typeof SettingsSchema>) =>{
    startTransiton(()=>{
      settings(values)
      .then((data)=>{
        if(data.error){
          setError(data.error);
        }

        if(data.success){
          update();
          setSuccess(data.success);
        }
      })
      .catch(()=>setError("something went wrong"))
    })
  }




 
  return (
   
   
    <Card className='w-[550px]'>
      <CardHeader>
        <p className='flex text-2xl font-light items-center justify-center
        '><CiSettings size={25} />
  Settings</p>
      </CardHeader>

      <CardContent>

      <Form {...form}>

    <form onSubmit={form.handleSubmit(onSubmit)}
    className='space-y-4'>

      <div>

                <FormField
          control={form.control}
          name="name"
          render={({field})=>(
                  <FormItem>
                    <FormLabel>Name </FormLabel>
                    <FormControl>
                      <Input placeholder='123456'
                      disabled={isPending}
                      {...field}>
                      
                      </Input>

                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />


                {user?.isOAuth === false &&(

                  <>

<FormField
          control={form.control}
          name="email"
          render={({field})=>(
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input placeholder='Email Address'
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
                    <FormLabel>Password </FormLabel>
                    <FormControl>
                      <Input placeholder='Password'
                      disabled={isPending}
                      type="password"
                      {...field}>
                      
                      </Input>

                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />



<FormField
          control={form.control}
          name="newPassword"
          render={({field})=>(
                  <FormItem>
                    <FormLabel>New Password </FormLabel>
                    <FormControl>
                      <Input placeholder='Password'
                      type="password"
                      disabled={isPending}
                      {...field}>
                      
                      </Input>

                    </FormControl>
                    <FormMessage/>
                  </FormItem>
                )} />


                
       
                  
                  
                  
                  </>

                )}


<div className='h-11'></div>            
<FormField
          control={form.control}
          name="role"
          render={({field})=>(
                  <FormItem>
                    <FormLabel>Role  :</FormLabel>

                    <Select 
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}>


                      <FormControl>
                        <SelectTrigger  className="w-[180px]">

                          <SelectValue placeholder="Select a role"></SelectValue>
                        </SelectTrigger>

                      </FormControl>

                      <SelectContent>
                        <SelectItem value={UserRole.ADMIN}>
                          Admin
                        </SelectItem>

                        <SelectItem value={UserRole.USER}>
                          User
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage/>
                   



                    <FormMessage/>
                  </FormItem>
                )} />


<div className='h-28'></div>
{user?.isOAuth === false &&(


<FormField
          control={form.control}
          name="isTwoFactorEnabled"
          render={({field})=>(
                  <FormItem className='flex flex-row items-center
                  justify-between p-3 border'>

                    <div className='space-y-1'>
                      <FormLabel>
                        Two Factor Auth
                      </FormLabel>

                      <FormDescription>
                        enable two factor auth for your account
                      </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                        disabled={isPending}
                        checked={field.value}
                        onCheckedChange={field.onChange}>

                        </Switch>

                      </FormControl>

                  </FormItem>
                )} />


)}

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



      </CardContent>


    </Card>
  )
}

export default SettingsPage