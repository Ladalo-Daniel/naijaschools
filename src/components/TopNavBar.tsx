"use client"

import { useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar } from '@radix-ui/react-avatar'
// import {NotificationIcon} from "./NotificationIcon";




const TopNavBar = () => {

  const [mobileMenu, setMobileMenu] = useState(false)
  const navRef = useRef()
  const path = usePathname()

     return(
       <>
        <nav className="bg-white bg-opacity-80 w-full p-2 md:p-5 md:w-[80%] top-0 z-50 h-20 fixed flex flex-row justify-between md:flex md:flex-row md:justify-between items-center ">
          <div className=" flex justify-between items-center gap-2  md:px-3">
            <Link href='/dashboard' className=' md:hidden'>
              <Image
                  src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" 
                  width={35} 
                  height={35}
                  alt="Float UI logo"
              />
            </Link>
            <button className="text-gray-700 outline-none p-1 rounded-md focus:border-lightGreen focus:border md:hidden"
                onClick={() => setMobileMenu(!mobileMenu)}
            >
                {
                    mobileMenu ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                        </svg>
                    )
                }
            </button>
            <h1 className='hidden md:block leading-8 text-lg md:text-3xl text-black font-poppins'>{path.slice(1).charAt(0).toUpperCase() + path.slice(2)}</h1>
          </div>
          <div className=' flex flex-row gap-2 text-darkSlate items-center'>
            <Avatar>
              <Image
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d" 
                className='' 
                height={20} 
                width={20}
                alt='photo'
              />
            </Avatar>
            <span className=' text-slate md:text-xl'>Hi, Ladalo</span>
          </div>
        </nav>
         {mobileMenu && <MobileMenu state={mobileMenu} setState={setMobileMenu} />}
       </>
     )
}

export default TopNavBar




