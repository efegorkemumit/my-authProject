import React from 'react'
import { FaUnlock } from "react-icons/fa";

interface HeaderProps{
    label: string

}

const Header = ({label} :HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-4 items-center justify-center'>
               <h1 className="flex font-semibold text-7xl gap-4 text-slate-600">


<FaUnlock />  Auth
</h1>

      
      <p className=' text-lg mt-8'>  {label} </p>
       
        
    </div>
  )
}

export default Header