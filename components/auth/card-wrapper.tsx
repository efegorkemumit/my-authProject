import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import Header from './header';
import BackButton from './back-button';
import Social from './social';

interface CardWrapperProps{
    children : React.ReactNode;
    headerLabel : string;
    backButtonLabel : string;
    backButtonHref: string;
    showSocail? :boolean
}

const CardWrapper = ({
    children, headerLabel, backButtonHref, backButtonLabel ,showSocail
}:CardWrapperProps) => {
  return (
    <Card className='w-[500px] shadow-lg'>
      <CardHeader>
       <Header label={headerLabel}></Header>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocail && (
        <CardFooter>
          <Social></Social>
        </CardFooter>
      )}

      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel}></BackButton>
      </CardFooter>
      
        
    </Card>
  )
}

export default CardWrapper