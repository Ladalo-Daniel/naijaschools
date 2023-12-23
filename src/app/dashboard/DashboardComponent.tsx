import { getProfile } from '@/supabase/user'
import React from 'react'
import AdminComponent from './AdminComponent'
import StudentComponent from './StudentComponent'

const DashboardComponent = async () => {
  const profile = await getProfile()
  return (
    <div className='flex flex-col gap-3'>
        {
            profile?.data?.role === "admin" && <AdminComponent />
        }
        {
          profile?.data?.role === "user" && <StudentComponent />
        }
    </div>
  )
}

export default DashboardComponent