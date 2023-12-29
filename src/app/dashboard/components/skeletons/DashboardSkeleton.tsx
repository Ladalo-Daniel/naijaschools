import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const DashboardSkeleton = () => {
  return (
    <div className='flex flex-1 flex-col gap-3'>
        <div className='flex gap-3'>
            <Skeleton className='h-10 rounded-md shadow w-12' />
            <Skeleton className='h-10 rounded-md shadow w-12' />
        </div>
        <div className='flex flex-col md:flex-row gap-6 max-md:mx-auto justify-center items-center'>
            <Skeleton className='h-[300px] rounded-full shadow w-[300px] justify-between border-[100px] max-w-[600px]' />
            <Skeleton className='rounded-lg shadow flex-1 h-80' />
        </div>
        <div className='flex gap-3'>
            <Skeleton className='h-10 rounded-md shadow w-12' />
            <Skeleton className='h-10 rounded-md shadow w-12' />
        </div>
        <Skeleton className='w-12 h-4' />
        <div className='flex flex-wrap gap-4 max-md:mx-auto justify-center items-center'>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
            <Skeleton className='h-44 w-64 rounded-md shadow'/>
        </div>
    </div>
  )
}

export default DashboardSkeleton