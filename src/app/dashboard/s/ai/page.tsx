import React from 'react'
import MaxWrapper from '@/components/MaxWrapper'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { SparklesIcon } from 'lucide-react'

const AIPage = () => {
  return (
    <MaxWrapper className='bg-background flex-1'>
        <h2 className="text-2xl py-2 text-primary">Welcome to our AI guide.</h2>
        <Alert className='flex gap-2'>
            <SparklesIcon />
            <AlertDescription>
            Note that this feature is a work in progress... please check back soon as the @Naijaschools team is working to ensure it is served up to you. 
            </AlertDescription>
        </Alert>
    </MaxWrapper>
  )
}

export default AIPage