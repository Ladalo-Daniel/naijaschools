import React, { Suspense } from 'react'
import TableList from '../../components/TableList'
import { TeacherList, getTeachers } from '@/supabase/teachers'
import TableSkeleton from '../../components/skeletons/TableSkeleton'

const TeacherComponent = async () => {
    const { data: teachers } = await getTeachers()
  return (
    <div className='flex flex-col gap-3'>
        <Suspense fallback={<TableSkeleton />}>
          <TableList table={teachers as TeacherList} role='teachers' />
        </Suspense>
    </div>
  )
}

export default TeacherComponent