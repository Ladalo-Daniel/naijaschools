"use client"

// import React from 'react'

// export default function TopNavBar() {
//   return (
//     <div>TopNavBar</div>
//   )
// }


// import logt2 from "@/app/assets/logt2.png"
// import logt1 from "@/app/assets/logt1.jpeg"
// import logt1 from "../public/images/logt1.jpeg"
import { useEffect, useRef, useState } from 'react'
import MobileMenu from './MobileMenu'
import { Avatar, Badge, Button, Image, Link, User } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
// import {NotificationIcon} from "./NotificationIcon";
import { BsCart2 } from 'react-icons/bs'




export default () => {

//   const [state, setState] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const navRef = useRef()
  const path = usePathname()
  // Remove leading slash and capitalize the first letter using chaining
  // const p = path.slice(1).charAt(0).toUpperCase() + path.slice(2);


  // Replace javascript:void(0) path with your path
//   const navigation = [
//       { title: "Customers", path: "javascript:void(0)" },
//       { title: "Careers", path: "javascript:void(0)" },
//       { title: "Guides", path: "javascript:void(0)" },
//       { title: "Partners", path: "javascript:void(0)" },
//       { title: "Teams", path: "javascript:void(0)" },
//       { title: "Blog", path: "javascript:void(0)" }
//   ]

//   useEffect(() => {
      
//       const body = document.body

//       // Disable scrolling
//       const customBodyStyle = ["overflow-hidden", "lg:overflow-visible"]
//       if (state) body.classList.add(...customBodyStyle)
//       // Enable scrolling
//       else body.classList.remove(...customBodyStyle)

//       // Sticky strick
//       const customStyle = ["sticky-nav", "fixed", "border-b"]
//       window.onscroll = () => {
//           if (window.scrollY > 80 ) navRef.current.classList.add(...customStyle)
//           else navRef.current.classList.remove(...customStyle)
//       }
//     }, [state])

    
     return(
       <>
        <nav className="bg-white bg-opacity-90 w-full p-2 md:p-5 md:w-[80%] top-0 z-50 h-20 fixed flex flex-row justify-between md:flex md:flex-row md:justify-between items-center ">
          <div className=" flex justify-between items-center gap-2  md:px-3">
            <Link href='/dashboard' className=' md:hidden'>
              <Image
                  src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" 
                  // src={logt1}
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
          <div className=' flex flex-row gap-2  text-darkSlate items-center'>
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" name='Ladalo' className='' height={20} width={20} />
            <span className=' text-slate md:text-xl'>Hi, Ladalo</span>
            {/* <Badge content="9+" shape="circle" color="danger" className=' text-lightRed'>
              <Button
                radius="full"
                isIconOnly
                aria-label="more than 99 notifications"
                variant=""
                className=" bg-lightRed text-white"
              >
                <BsCart2 size={24} />
              </Button>
            </Badge> */}
          </div>
        </nav>
         {mobileMenu && <MobileMenu state={mobileMenu} setState={setMobileMenu} />}
       </>
     )
    

  return (
      <>
      <nav ref={navRef} className="bg-white bg-opacity-80 w-full top-0 z-50 h-20 fixed">
          <div className=" flex justify-between items-center px-4 max-w-screen-xl mx-auto">
                  <div className="flex gap-x-4 items-center py-3 lg:py-4  md:hidden">
                    <Link href='/dashboard' className=' md:hidden'>
                        <Image
                            src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" 
                            // src={logt1}
                            width={35} 
                            height={35}
                            alt="Float UI logo"
                        />
                    </Link>
                      <button className="text-gray-700 outline-none p-1 rounded-md focus:border-lightGreen focus:border"
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
                 </div>
                 <div className=' gap-4 text-yellow text-3xl'>
                  <User />
                 </div>
          </div>
        {mobileMenu && <MobileMenu state={mobileMenu} setState={setMobileMenu} />}
      </nav>
      </>
  )
}






