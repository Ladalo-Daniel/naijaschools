'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { query_string } from './utils/query_string'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { faculties } from '@/lib/faculties'
import { useGetCourseByQuery, useGetInstitutions } from '@/lib/react-query'
import MiniLoader from './MiniLoader'
import { InstitutionList } from '@/supabase/institutions'

interface LessonFilterProps {
    schools: InstitutionList,
}

const LessonFilter: React.FC<LessonFilterProps> = ({
    schools
}) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [school, setSchool] = useState(searchParams.get('school') || '')
    const [faculty, setFaculty] = useState(searchParams.get('faculty') ||'')
    const [course, setCourse] = useState(searchParams.get('course') ||'')
    
    const [query, setQuery] = useState('')
    // useEffect(() => {
        // }, [school, course, faculty])
        
    const handleChange = (v: string, type: 'school' | 'faculty' | 'course') => {
       const query = query_string(school, faculty, course)
       setQuery(query)
       if (type === 'school') {
          setSchool(v)
          router.push(query)
       }
       if (type === 'faculty') {
          setFaculty(v)
          router.push(query)
       }
       if (type === 'course') {
           router.push(query)
           setCourse(v)
       }
    } 
    
    const { data: courses, isPending: gettingCourses } = useGetCourseByQuery({
        column: "institution",
        row: school
    })

  return (
    <div className='flex gap-3 items-center max-xs:flex-col'>
        
                <Select onValueChange={v => handleChange(v, 'school')} defaultValue={school}>
                    <SelectTrigger className='w-72'>
                      <SelectValue placeholder="Select an institution." />
                    </SelectTrigger>
                    <SelectContent>
                        {
                        schools?.map(s => (
                            <SelectItem value={s.id.toString()} key={s.id}>{s.name}</SelectItem>
                        ))
                        }
                    </SelectContent>
                </Select>

        <Select onValueChange={v => handleChange(v, 'faculty')} defaultValue={faculty}>
            <SelectTrigger className='w-72'>
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
            (gettingCourses && (school || faculty)) ? <MiniLoader /> : (
                <>
                  {(courses && courses?.data) && 
                  <Select onValueChange={v => handleChange(v, 'course')} defaultValue={course}>
                        <SelectTrigger className='w-72'>
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