import { getProfile } from '@/supabase/user'
import React from 'react'
import AdminComponent from './AdminComponent'
import StudentDashBoardComponent from './StudentDashBoardComponent'
import StaffDashBoardComponent from './StaffDashBoardComponent'
import { redirect } from 'next/navigation'

const DashboardComponent = async () => {
  const profile = await getProfile()
  return (
    <div className='flex flex-col gap-3 md:px-8 max-sm:w-full px-3'>
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