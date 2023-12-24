import React from 'react'
import TableList from '../components/TableList'
import { TeacherList, getTeachers } from '@/supabase/teachers'

const TeacherComponent = async () => {
    const { data: teachers } = await getTeachers()
  return (
    <div className='flex flex-col gap-3'>
        <TableList table={teachers as TeacherList} role='teachers' />
    </div>
  )
}

export default TeacherComponent