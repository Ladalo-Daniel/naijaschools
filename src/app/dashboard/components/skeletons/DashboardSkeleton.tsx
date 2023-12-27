import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const DashboardSkeleton = () => {
  return (
    <div className='flex flex-1 flex-col gap-3'>
        <div className='flex gap-3'>
            <Skeleton className='h-10 rounded-md shadow w-12' />
            <Skeleton className='h-10 rounded-md shadow w-12' />
        </div>
        <Skeleton className='w-12 h-4' />
        <div className='flex flex-wrap gap-4'>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
        </div>
    </div>
  )
}

export default DashboardSkeleton