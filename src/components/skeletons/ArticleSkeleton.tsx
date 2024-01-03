import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ArticleSkeleton = () => {
  return (
    <div className='flex flex-wrap max-sm:items-center gap-4 p-4'>
        <Skeleton className='min-w-[320px] rounded-md shadow h-[350px]' />
        <Skeleton className='min-w-[320px] rounded-md shadow h-[350px]' />
        <Skeleton className='min-w-[320px] rounded-md shadow h-[350px]' />
    </div>
  )
}

export default ArticleSkeleton