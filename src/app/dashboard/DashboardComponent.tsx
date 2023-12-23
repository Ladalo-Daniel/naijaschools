import { getProfile } from '@/supabase/user'
import React from 'react'
import AdminComponent from './AdminComponent'

const DashboardComponent = async () => {
    const profile = await getProfile()
  return (
    <div className='flex flex-col gap-3'>
        {
            profile?.data?.role === "admin" && <AdminComponent />
        }
    </div>
  )
}

export default DashboardComponent