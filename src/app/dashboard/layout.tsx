import React from 'react'
import LeftSidebar from './components/LeftSidebar'
import TopNavbar from './components/TopNavbar'

const Layout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  // await supabase
  return (
    <div className='w-full bg-dark-1 md:flex relative'>
      <TopNavbar />
      <LeftSidebar />
      <main className='flex min-h-screen dark:bg-background bg-slate-100 py-10 space-y-8 flex-1 h-full'>
        { children }
      </main>
    </div>
  )
}

export default Layout