"use client"
import TopNavBar from './TopNavBar'
import LeftSidebar from './LeftSidebar'
import RightSideBar from './RightSideBar'
import Footer from './Footer'
import { usePathname } from 'next/navigation'
// import { useEffect, useState } from 'react';

export default function MainLayout({ children }) {
  const path = usePathname()

  return (
    <>
      <div className=' flex flex-row'>
         <div className=' w-0 md:w-[20%] '>
           <LeftSidebar />
         </div>
         <div className='w-[100%] md:w-[80%]'>
           <TopNavBar />
             <div className=' w-[100%]  min-h-[100vh] mt-20'>
              <h1 className=' leading-8 text-2xl text-black font-poppins px-2 py-2 md:hidden'>{path.slice(1).charAt(0).toUpperCase() + path.slice(2)}</h1>
                {children}
             </div>
           <Footer />
         </div>
         {/* <div className='w-0 md:w-[10%]'>
          <RightSideBar />
         </div> */}
      </div>
    </>
  )
}
