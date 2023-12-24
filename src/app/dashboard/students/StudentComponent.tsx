import React from 'react'
import StudentsList from '../components/TableList'
import { StudentList as StudentListType, getStudents } from '@/supabase/students'

const StudentComponent = async () => {
    const { data: students } = await getStudents()
  return (
    <div className='flex flex-col gap-3'>
        <StudentsList students={students as StudentListType} />
    </div>
  )
}

export default StudentComponent