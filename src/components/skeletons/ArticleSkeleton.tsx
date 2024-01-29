import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ArticleSkeleton = () => {
  return (
    <div className='flex flex-wrap max-sm:items-center gap-4 p-4'>
        <Skeleton className='min-w-[220px] rounded-md shadow h-[300px]' />
        <Skeleton className='min-w-[220px] rounded-md shadow h-[300px]' />
        <Skeleton className='min-w-[220px] rounded-md shadow h-[300px]' />
    </div>
  )
}

export default ArticleSkeleton