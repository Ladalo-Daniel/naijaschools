"use client"

import { Button, Card, Image, Link, useDisclosure } from "@nextui-org/react"
import { useState } from "react"

import { FaRegUser } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { PiUsersThree, PiUsersThreeFill } from "react-icons/pi";
import { HiMiniTrophy, HiOutlineTrophy } from "react-icons/hi2";
import {  BsGrid, BsGridFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import QuizModal from "./QuizUI/QuizModal";


export default function LeftSidebar() {
  const [state, setState] = useState(false)
  const [open, setOpen] = useState(false)
  
  // const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const Navigation = [
    {
      Link: "/dashboard",
      icon: <BsGrid />,
      activeIcon: <BsGridFill />,
      tooltip: "Dashboard",
      navigateupName: "dashboard",
    },
    {
      Link: "/profile",
      icon: <FaRegUser />,
      activeIcon: <FaUser />,
      tooltip: "Profile",
      navigateupName: "profile",
    },
    // {
    //   Link: "/quiz",
    //   icon: <FaRegUser />,
    //   activeIcon: <FaUser />,
    //   tooltip: "Quiz",
    //   navigateupName: "quiz",
    // },
    {
      Link: "/community",
      icon: <PiUsersThree />,
      activeIcon: <PiUsersThreeFill />,
      tooltip: "Community",
      navigateupName: "community",
    },
    // {
    //   Link: "/community",
    //   icon: <PiUsersThree />,
    //   activeIcon: <PiUsersThreeFill />,
    //   tooltip: "Level",
    //   navigateupName: "community",
    // },
    // {
    //   Link: "/community",
    //   icon: <PiUsersThree />,
    //   activeIcon: <PiUsersThreeFill />,
    //   tooltip: "Quize",
    //   navigateupName: "community",
    // },
]

  const paths = usePathname();

  return(
    <nav className=' w-0 md:w-[20%] bg-white  md:fixed text-slate h-full overflow-auto '>
        {/* LOGO AND BAR */}
        <div className="md:flex flex-row gap-x-6 items-center justify-center py-6 border-b-lightGreen border-b-1 hidden  ">
            <Link href="/dashboard">
                <Image height={45} width={45}  src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" />
            </Link>
            <Button 
              onClick={() => setState(!state)}
              className="text-gray-700 outline-none p-1 rounded-md focus:border-lightGreen focus:border hidden">
              {
                state ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                    </svg>
                )
              }
            </Button>
        </div>
        {/* NAVLINKS */}
        <div className=" flex flex-col gap-2 h-full mt-4 overflow-auto">
           <div className=" flex flex-col gap-4 justify-center items-center text-slate font-poppins text-lg">
             {Navigation.map((item, idx) => (
                <Link id={idx} href={item.Link} className={`${paths === item.Link ? "bg-green text-white" : "bg-white"} flex gap-4 shadow-lg hover:bg-lightGreen hover:text-white w-[90%] p-4 rounded-md`}>
                    <span>{paths === item.Link ? item.activeIcon : item.icon}</span>
                    <span>{item.tooltip}</span>
                </Link>
             ))}
             
             { <QuizModal open={open} setOpen={setOpen}/>}
           </div>
           <Card className=" bg-lightPink w-[90%] flex flex-col gap-6 ml-4 rounded-md p-9 md:p-12 mt-2 ">
              <h1 className=" font-bold text-lg text-gray">Your 3MTT Status</h1>
              <p className=" text-lightGray">Your application is  complete and under review.</p>
              <h4 className=" bg-yellow text-white font-poppins py-2 rounded-md text-center cursor-pointer hover:bg-opacity-80">Application <br /> Completed</h4>
           </Card>
           <div className=" flex justify-center items-center mt-3 ">
           <Link href="/dashboard">
              <Image height={100} width={100} src="https://app.3mtt.training/static/media/fg.0cc10dcc9e563bcbd74d.png" />
           </Link>
           </div>
           <div className=" px-9">
             <p className=" text-gray"><strong>Ladalo</strong> &copy; 2023 All Rights Reserved.</p>
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
