import { getProfile } from '@/supabase/user'
import React from 'react'
import AdminComponent from './AdminComponent'
import StudentComponent from './StudentComponent'
import StaffComponent from './StaffComponent'

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
        {
          profile?.data?.role === "staff" && <StaffComponent />
        }
    </div>
  )
}

export default DashboardComponent