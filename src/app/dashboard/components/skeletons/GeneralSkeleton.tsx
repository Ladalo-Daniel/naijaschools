import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const GeneralSkeleton = () => {
  return (
    <div className='flex flex-col gap-3'>
        <Skeleton className='w-full h-10 rounded-md' />
        <Skeleton className='w-full h-10 rounded-md' />
        <Skeleton className='w-full h-10 rounded-md' />
        <Skeleton className='w-full h-10 rounded-md' />
    </div>
  )
}

export default GeneralSkeleton