import { getProfile } from '@/supabase/user'
import React, { Suspense } from 'react'
import AdminComponent from './AdminComponent'
import StudentDashBoardComponent from './StudentDashBoardComponent'
import StaffDashBoardComponent from './StaffDashBoardComponent'
import DashboardSkeleton from './components/skeletons/DashboardSkeleton'
import ArticleSkeleton from '@/components/skeletons/ArticleSkeleton'

const DashboardComponent = async () => {
  const profile = await getProfile()
  return (
    <div className='flex flex-col gap-3 md:px-8 max-sm:w-full px-3'>
        {
            profile?.data?.role === "admin" && (
              <Suspense fallback={<DashboardSkeleton />}>
                <AdminComponent />
              </Suspense>
            )
        }
        {
          profile?.data?.role === "user" && (
            <Suspense fallback={<ArticleSkeleton />}>
              <StudentDashBoardComponent />
            </Suspense>
          )
        }
        {
          profile?.data?.role === "staff" && (
            <Suspense fallback={<ArticleSkeleton />}>
              <StaffDashBoardComponent />
            </Suspense>
          )
        }
    </div>
  )
}

export default DashboardComponent