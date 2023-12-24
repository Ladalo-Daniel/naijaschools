import React from 'react'
import StudentsList from '../components/TableList'
import { TeacherList, getTeachers } from '@/supabase/teachers'

const TeacherComponent = async () => {
    const { data: teachers } = await getTeachers()
  return (
    <div className='flex flex-col gap-3'>
        <StudentsList students={teachers as TeacherList} />
    </div>
  )
}

export default TeacherComponent