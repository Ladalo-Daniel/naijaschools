'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { query_string } from './utils/query_string'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { faculties } from '@/lib/faculties'
import { useGetCourseByQuery, useGetInstitutions } from '@/lib/react-query'
import MiniLoader from './MiniLoader'

interface LessonFilterProps {}

const LessonFilter: React.FC<LessonFilterProps> = ({}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { data: schools, isPending: gettingSchools } = useGetInstitutions()

    const [school, setSchool] = useState('')
    const [faculty, setFaculty] = useState('')
    const [course, setCourse] = useState('')

    const { data: courses, isPending: gettingCourses } = useGetCourseByQuery({
        column: "institution",
        row: school
    })

    const query = query_string(school, faculty, course)

  return (
    <div className='flex gap-3 items-center max-xs:flex-col'>
        {
            gettingSchools ? <MiniLoader /> : (
                <Select onValueChange={v => {
                    setSchool(v)
                    router.push(query)
                }} defaultValue={school}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an institution." />
                    </SelectTrigger>
                    <SelectContent>
                        {
                        schools?.data?.map(s => (
                            <SelectItem value={s.id.toString()} key={s.id}>{s.name}</SelectItem>
                        ))
                        }
                    </SelectContent>
                </Select>
            )
        }

        <Select onValueChange={v => {
            setFaculty(v)
            router.push(query)
        }} defaultValue={faculty}>
            <SelectTrigger>
              <SelectValue placeholder="Select a valid faculty." />
            </SelectTrigger>
            <SelectContent>
                {
                faculties.map(f => (
                    <SelectItem value={f} key={f}>{f}</SelectItem>
                ))
                }
            </SelectContent>
        </Select>

        {
            (gettingSchools || gettingCourses) ? <MiniLoader /> : (
                <>
                  {(courses && courses?.data) && 
                  <Select onValueChange={v => {
                        setCourse(v)
                        router.push(query)
                    }} defaultValue={course}>
                        <SelectTrigger>
                        <SelectValue placeholder="Select a valid course." />
                        </SelectTrigger>
                        <SelectContent>
                            {
                            courses?.data.map(k => (
                                <SelectItem value={k.id.toString()} key={k.id}>{k.name}</SelectItem>
                            ))
                            }
                        </SelectContent>
                    </Select>}
                </>
            )
        }
    </div>
  )
}

export default LessonFilter