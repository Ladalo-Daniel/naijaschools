import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SelectCourseSkeleton = () => {
  return (
    <div className='flex flex-col gap-3 my-3'>
        <Skeleton className="h-4 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[250px]" />
    </div>
  )
}

export default SelectCourseSkeleton