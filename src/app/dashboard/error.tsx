'use client' 
 
import { useEffect } from 'react'

import { Button as NextButton } from '@nextui-org/button'
import { LucideRefreshCcw } from 'lucide-react'
import MaxWrapper from '@/components/MaxWrapper'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <MaxWrapper className='flex max-w-5xl flex-1 min-h-screen w-full bg-background'>
      <div className='p-6 flex flex-col gap-4 mx-2 w-fit rounded-md'>
        <h2 className='text-2xl py-2 text-rose-500'>Something went wrong but we do not want to keep you off Naijaschools!</h2>
        <p className='py-2 text-rose-500'>It looks like you are disconnected from the internet. A few steps might help:</p>
        <p className='py-2'>- Be sure your network is running correctly</p>
        <p className='py-2'>- Having done that, hit the &quot;please try again&quot; button</p>
        <p className='py-2'>- If it persists, hit the yellow refresh button. This time it should work.</p>
        <NextButton
            onClick={
            () => reset()
            }
            variant='flat' 
            color='primary'
            className='w-fit'
        >
            Please Try again!
        </NextButton>
        <NextButton variant='flat' color='warning' isIconOnly><LucideRefreshCcw size={18}
          onClick={() => location.reload()}
        /></NextButton>
      </div>
    </MaxWrapper>
  )
}