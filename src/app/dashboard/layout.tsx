import React, { Suspense } from 'react'
import LeftSidebar from './components/LeftSidebar'
import TopNavbar from './components/TopNavbar'
import { User, getProfile } from '@/supabase/user'
import Loading from './loading'

const Layout = async ({ children }: { children: React.ReactNode }): Promise<React.JSX.Element> => {
  const profile = await getProfile()
  return (
    <Suspense fallback={<Loading />}>
    <div className='w-full bg-dark-1 md:flex relative'>
      <TopNavbar />
      <LeftSidebar profile={profile?.data as User} />
      <main className='flex min-h-screen dark:bg-background bg-slate-100 flex-1 h-full'>
        { children }
      </main>
    </div>
    </Suspense>
  )
}

export default Layout