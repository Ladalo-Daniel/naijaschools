import MaxWrapper from '@/components/MaxWrapper'
import { Alert } from '@/components/ui/alert'
import React from 'react'

const AIPage = () => {
  return (
    <MaxWrapper className='bg-background flex-1'>
        <h2 className="text-2xl py-2 text-primary">Welcome to our AI guide.</h2>
        <Alert>
            Note that this feature is a work in progress... please check back soon as the @Naijaschools team is working to ensure it is served up to you. 
        </Alert>
    </MaxWrapper>
  )
}

export default AIPage