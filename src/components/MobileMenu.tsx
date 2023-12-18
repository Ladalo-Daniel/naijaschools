"use client"

import { usePathname } from "next/navigation";
import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboardIcon, LucideLayoutGrid, User, User2, Users, Users2Icon } from "lucide-react";


export default function MobileMenu({ state, setState }: { state: boolean, setState: () => void}) {
//   const [state, setState] = useState(false)
const links = [
  {
    Link: "/dashboard",
    icon: <LayoutDashboardIcon />,
    activeIcon: <LayoutDashboardIcon />,
    tooltip: "Dashboard",
    navigateupName: "dashboard",
  },
  {
    Link: "/profile",
    icon: <User />,
    activeIcon: <User2 />,
    tooltip: "Profile",
    navigateupName: "profile",
  },
  {
    Link: "/community",
    icon: <Users />,
    activeIcon: <Users2Icon />,
    tooltip: "Community",
    navigateupName: "community",
  },
]

  const paths = usePathname();

  return(
    <nav className=' w-[70%] z-20 md:w-[20%] bg-white  md:fixed text-slate h-full md:hidden fixed overflow-auto transition-all transition-left top-[10%] '>
        <div className=" flex flex-col gap-1 h-full  overflow-auto mt-2">
           <div className=" flex flex-col gap-4 justify-center items-center text-slate font-poppins text-lg">
             {links.map((link, idx) => (
                <Link href={link.Link} key={idx} className={`${paths === link.Link ? "bg-green text-white" : "bg-white"} flex gap-4 shadow-lg hover:bg-lightGreen hover:text-white w-[90%] p-4 rounded-md`}>
                    <Button>{paths === link.Link ? link.activeIcon : link.icon}</Button>
                    <span>{link.tooltip}</span>
                </Link>
             ))}
           </div>
           <Card className=" bg-lightPink w-[90%] flex flex-col gap-2 ml-4 rounded-md p-6 mt-2 ">
              <h1 className=" font-bold text-lg text-gray">Your 3MTT Status</h1>
              <p className=" text-lightGray">Your application is  complete and under review.</p>
              <h4 className=" bg-yellow text-white font-poppins py-1 rounded-md text-center cursor-pointer hover:bg-opacity-80">Application <br /> Completed</h4>
           </Card>
           <div className=" flex justify-center items-center mt-1">
           <Link href="/dashboard">
              <Image 
                height={80} 
                width={80} 
                src="https://app.3mtt.training/static/media/fg.0cc10dcc9e563bcbd74d.png"
                alt="logo"
                />
           </Link>
           </div>
           <div className=" px-6">
             <p className=" text-gray"><strong>Ladalo</strong> c2023 All Rights Reserved.</p>
           </div>
        </div>
    </nav>
  )

  
  //return (
//     <div className=' w-0 md:w-[20%] bg-white  md:fixed text-slate h-full '>
//              <div className="md:flex flex-row gap-x-6 items-center py-6 border-b-lightGreen border-b-1 hidden  ">
//                     <a href="javascript:void(0) " className=" ml-14">
//                         <img
//                             src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" 
//                             width={30} 
//                             height={30}
//                             alt="Float UI logo"
//                         />
//                     </a>
//                     <div className="">
//                       <button className="text-gray-700 outline-none p-1 rounded-md focus:border-lightGreen focus:border hidden"
//                           onClick={() => setState(!state)}
//                       >
//                           {
//                               state ? (
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
//                                       <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                                   </svg>
//                               ) : (
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
//                                   </svg>
//                               )
//                           }
//                       </button>
//                     </div>
//               </div>
//     <div className=" h-full overflow-auto">
//     </div>
//     </div>
//   )
}





// "use client"

// import { useState } from "react"

// export default function MobileMenu({ state, setState}) {
// //   const [state, setState] = useState(false)

  
//   return (
//     <div className=' w-[40%] z-30 md:w-[20%] bg-lightPink shadow-inner  transition-transform  md:hidden fixed  md:fixed text-slate h-full '>
//              {/* <div className="flex flex-row gap-x-6 items-center py-6 border-b-lightGreen border-b-1  ">
//                     <a href="javascript:void(0) " className=" ml-7">
//                         <img
//                             src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" 
//                             width={30} 
//                             height={30}
//                             alt="Float UI logo"
//                         />
//                     </a>
//                     <div className="">
//                       <button className="text-gray-700 outline-none p-1 rounded-md focus:border-lightGreen focus:border"
//                           onClick={() => setState(!state)}
//                       >
//                           {
//                               state ? (
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
//                                       <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
//                                   </svg>
//                               ) : (
//                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
//                                   </svg>
//                               )
//                           }
//                       </button>
//                     </div>
//               </div> */}
//     <div className=" h-full overflow-auto">
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
//     <p>heyyyyyyyyyy</p>
    
//     <p>heyyyyyyyyyy</p>
//     </div>
//     </div>
//   )
// }
