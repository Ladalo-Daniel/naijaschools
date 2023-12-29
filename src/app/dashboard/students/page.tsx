import MaxWrapper from '@/components/MaxWrapper'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'
import React from 'react'
import StudentComponent from './StudentComponent'
import BackButton from '@/components/shared/BackButton'

const AdminStudentViewPage = async () => {
    const profile = await getProfile()
    if (!(profile?.data?.role === 'admin' || profile?.data?.role === 'staff')) {
        return redirect('/dashboard')
    }

  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
      <BackButton/>
        <h2 className="text-2xl py-2">Students</h2>
        <div className='flex flex-col gap-3'>
            <StudentComponent />
        </div>
    </MaxWrapper>
  )
}

export default AdminStudentViewPage