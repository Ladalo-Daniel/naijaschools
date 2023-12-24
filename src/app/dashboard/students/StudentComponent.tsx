import React from 'react'
import { StudentList as StudentListType, getStudents } from '@/supabase/students'
import TableList from '../components/TableList'

const StudentComponent = async () => {
    const { data: students } = await getStudents()
  return (
    <div className='flex flex-col gap-3'>
        <TableList table={students as StudentListType} role='students' />
    </div>
  )
}

export default StudentComponent