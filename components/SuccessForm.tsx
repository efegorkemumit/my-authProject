import React from 'react'
import { MdError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessFormProps{
    message?:string
}

const SuccessForm = ({message}:SuccessFormProps) => {

    if(!message) return null;
  return (
    <div className='bg-green-600 rounded-xl p-4 text-center
     justify-center items-center mb-2 text-lg text-white flex gap-2'>
        <FaCheckCircle  size={18}/> {message}
        
    </div>
  )
}

export default SuccessForm