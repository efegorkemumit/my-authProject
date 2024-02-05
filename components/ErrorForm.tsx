import React from 'react'
import { MdError } from "react-icons/md";

interface ErrorFormProps{
    message?:string
}

const ErrorForm = ({message}:ErrorFormProps) => {

    if(!message) return null;
  return (
    <div className='bg-red-600 rounded-xl p-4 text-center
     justify-center items-center mb-2 mt-2 text-lg text-white flex gap-2'>
        <MdError size={18}/> {message}
        
    </div>
  )
}

export default ErrorForm