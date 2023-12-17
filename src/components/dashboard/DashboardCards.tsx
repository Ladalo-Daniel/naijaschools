import ApplicationCard from './ApplicationCard';
import CoursesCards from './CoursesCards';
import Faq from './Faq';
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRightCircle, LucideCheckCircle2, Star } from 'lucide-react';
// import { useEffect, useState } from 'react';

export default function DashboardCards() {
  return (
    <section className=' p-2 md:p-5'>
       <div className=' flex flex-col gap-5'>
          <Card className=' bg-green hover:opacity-90 flex flex-row items-center justify-between rounded-md'>
            <h1 className=' text-white px-4 text-xs md:text-3xl lg:text-3xl md:p-7'>Hello <strong>Ladalo</strong>, <br /> Welcome to your naijaschools Dashboard</h1>
            <CardContent className=' flex items-baseline pl-4'>
            <Image 
              height={350} 
              width={350} 
              src='https://app.3mtt.training/static/media/education-girl.b8a777ab708c361de94c.png' 
              className=' items-baseline' 
              alt="lalala"
              />
            </CardContent>
          </Card>
          <Card className=' p-5 bg-lightRed hover:opacity-90 flex flex-row text-white rounded-md items-center font-poppins text-sm md:text-lg'>
            <span className=' text-white mr-4 ring-white ring-2 rounded-full p-1 text-sm md:text-xl'>
            <ChevronRightCircle />
            </span>
            <Link 
              href='#' 
              className=' cursor-pointer'>See list of all members of your school  <span className=' underline'>here</span></Link>
          </Card>
          <div className=' flex flex-col md:flex-row gap-2'>
            <Card className=' p-5 bg-darkGreen hover:opacity-90 md:w-1/2 flex flex-row items-center rounded-md text-whiteGreen gap-4'>
              <span className=' md:text-2xl p-4 font-bold rounded-xl text-green bg-white'><LucideCheckCircle2 /></span>
              <div className=' flex flex-col items-start'>
                <span>Community ID</span>
                <span className=' font-semibold'>FE/23/77645780</span>
              </div>
            </Card>
            <Card className=' p-5 bg-slate hover:opacity-90 md:w-1/2 flex flex-row items-center rounded-md text-whiteGreen gap-4 '>
              <span className=' md:text-2xl p-4 font-bold rounded-xl text-green bg-white'><Star /></span>
              <div className=' flex flex-col items-start'>
                <span>Your Institution</span>
                <span className=' font-semibold'>University of Abuja</span>
              </div>
            </Card>
          </div>
          <ApplicationCard />
          <CoursesCards />
          <Faq />
       </div>
    </section>
  )
}
