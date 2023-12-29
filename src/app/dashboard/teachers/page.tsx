import MaxWrapper from '@/components/MaxWrapper'
import { getProfile } from '@/supabase/user'
import { redirect } from 'next/navigation'
import React from 'react'
import TeacherComponent from './TeacherComponent'
import BackButton from '@/components/shared/BackButton'

const TeachersPage = async () => {
    const profile = await getProfile()
    if (!(profile?.data?.role === 'admin' || profile?.data?.role === 'staff')) {
        return redirect('/dashboard')
    }

  return (
    <MaxWrapper className='max-w-7xl flex-1 bg-background'>
      <BackButton/>
        <h2 className="text-2xl py-2">Teachers</h2>
        <div className='flex flex-col gap-3'>
            <TeacherComponent />
        </div>
    </MaxWrapper>
  )
}

export default TeachersPage