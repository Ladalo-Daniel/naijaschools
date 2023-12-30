import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const CardsSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-4'>
        <Skeleton className='h-44 w-64 rounded-lg shadow'/>
        <Skeleton className='h-44 w-64 rounded-lg shadow'/>
        <Skeleton className='h-44 w-64 rounded-lg shadow'/>
        <Skeleton className='h-44 w-64 rounded-lg shadow'/>
    </div>
  )
}

export default CardsSkeleton