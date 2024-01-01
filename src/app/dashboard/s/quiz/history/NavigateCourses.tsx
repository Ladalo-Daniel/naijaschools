'use client'

import { useGetCourseByQuery } from '@/lib/react-query'
import Link from 'next/link'
import React, { useState } from 'react'

const NavigateCourses = ({ courseIds }: { courseIds: number[] }) => {
    const [courseNames, setCourseNames] = useState<string[]>([])
    courseIds.forEach(id => {
        const { data } = useGetCourseByQuery({
            column: "id",
            row: id
        })
        setCourseNames(prev => [...prev, data?.data.at(0)?.name!])
    })
  return (
    <div>
        {
            courseNames?.map(name => (
                <Link href={`#${name}`} >{name}</Link>
            ))
        }
    </div>
  )
}

export default NavigateCourses