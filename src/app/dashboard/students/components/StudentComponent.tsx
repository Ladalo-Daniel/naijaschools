import React, { Suspense } from 'react'
import { StudentList as StudentListType, getStudents } from '@/supabase/students'
import TableList from '../../components/TableList'
import TableSkeleton from '../../components/skeletons/TableSkeleton'

const StudentComponent = async () => {
    const { data: students } = await getStudents()
  return (
    <div className='flex flex-col gap-3'>
        <Suspense fallback={<TableSkeleton />}>
          <TableList table={students as StudentListType} role='students' />
        </Suspense>
    </div>
  )
}

export default StudentComponent