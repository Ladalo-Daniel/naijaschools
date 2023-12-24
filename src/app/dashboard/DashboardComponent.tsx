import { getProfile } from '@/supabase/user'
import React from 'react'
import AdminComponent from './AdminComponent'
import StudentDashBoardComponent from './StudentDashBoardComponent'
import StaffDashBoardComponent from './StaffDashBoardComponent'

const DashboardComponent = async () => {
  const profile = await getProfile()
  return (
    <div className='flex flex-col gap-3 md:px-4 max-w-xs:px-8 px-16'>
        {
            profile?.data?.role === "admin" && <AdminComponent />
        }
        {
          profile?.data?.role === "user" && <StudentDashBoardComponent />
        }
        {
          profile?.data?.role === "staff" && <StaffDashBoardComponent />
        }
    </div>
  )
}

export default DashboardComponent