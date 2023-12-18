"use client"

import { useState } from "react"

import { LayoutDashboardIcon, LayoutGridIcon, User, User2, Users, Users2Icon } from 'lucide-react'
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Button as NextButton } from '@nextui-org/button'
import { Card as NextCard, CardHeader as NextCardHeader, CardBody as NextCardBody } from '@nextui-org/card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";


export default function LeftSidebar() {
  const [state, setState] = useState(false)
  const Navigation = [
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
    <nav className='w-0 md:w-[20%] md:fixed bg-secondary h-full overflow-auto'>
        <div className="md:flex flex-row gap-x-6 items-center justify-center py-6 border-b-primary border-b-1  ">
            <Link href="/dashboard">
                <Image 
                  height={45} 
                  width={45}
                  alt="profil"  
                  src="https://app.3mtt.training/static/media/main.242b8b1ce339b38fd589.png" />
            </Link>
            <NextButton 
              onClick={() => setState(!state)}
              className="outline-none p-1 rounded-md focus:border-primary focus:border hidden">
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
            </NextButton>
        </div>
        {/* NAVLINKS */}
        <div className=" flex flex-col gap-2 h-full mt-4 overflow-auto">
           <div className=" flex flex-col gap-4 justify-center items-center font-poppins text-lg">
             {Navigation.map(item => (
                <Link key={item.tooltip} href={item.Link} className={`${paths === item.Link ? "" : ""} flex gap-4 shadow-lg hover:bg-lightGreen hover:text-secondary w-[90%] p-4 rounded-md`}>
                    <Button>{paths === item.Link ? item.activeIcon : item.icon}</Button>
                    <span>{item.tooltip}</span>
                </Link>
             ))}
           </div>
           <NextCard className=" w-[90%] flex flex-col gap-6 ml-4 rounded-md p-9 bg-inherit md:p-12 mt-2 ">
              <NextCardHeader>
                <h2 className=" font-bold text-lg text-primary">Your 3MTT Status</h2>
              </NextCardHeader>
              <NextCardBody>
                <NextCardHeader className="text-secondary-foreground">Your application is  complete and under review.</NextCardHeader>
                <p className=" bg-yellow text-primary font-poppins py-2 rounded-md text-center cursor-pointer hover:bg-opacity-80">
                  Application <br /> Completed
                </p>
              </NextCardBody>
           </NextCard>
           <div className=" flex justify-center items-center mt-3 ">
           <Link href="/dashboard">
              <Image 
                height={100} 
                width={100} 
                alt="dboard"
                src="https://app.3mtt.training/static/media/fg.0cc10dcc9e563bcbd74d.png" />
           </Link>
           </div>
           <div className=" px-9">
             <p className=" text-foreground"><strong>Ladalo</strong>&copy; 2023 All Rights Reserved.</p>
           </div>
        </div>
    </nav>
  )
}
