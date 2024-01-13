'use client' 
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

import { Button as NextButton } from '@nextui-org/button'
import { LucideRefreshCcw } from 'lucide-react'
 
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
    <div className='flex mx-auto items-center justify-center min-h-screen w-full bg-background'>
      <div className='p-6 flex flex-col gap-4 mx-2 w-fit rounded-md items-center'>
        <h2 className='text-2xl py-2 text-rose-500 text-center'>Something went wrong!</h2>
        <Button
            onClick={
            () => reset()
            }
        >
            Please Try again!
        </Button>
        <NextButton variant='flat' color='warning' isIconOnly><LucideRefreshCcw size={18}
          onClick={() => location.reload()}
        /></NextButton>
      </div>
    </div>
  )
}