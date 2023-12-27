import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const TableSkeleton = () => {
  return (
    <div className='flex flex-col gap-2'>
        <Skeleton className='w-full h-8'/>
        <Skeleton className='w-full h-8'/>
        <Skeleton className='w-full h-8'/>
    </div>
  )
}

export default TableSkeleton