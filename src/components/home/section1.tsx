import Image from 'next/image'
import React from 'react'
import { SlideUp } from '../ui/animation'
import ButtonGroup from './homebutton'

export default function Section1() {
  return (
    <section className=' flex flex-col gap-7 md:flex-row md:justify-between md:items-center'>
        {/* ========LEFT_CONTENT======== */}
        <div className=' md:w-1/2 flex flex-col gap-7 md:gap-12'>
            <SlideUp>
              <h2 className='text-2xl md:text-4xl lg:text-4xl text-slate-600 dark:text-slate-400 font-light text-height-sm md:text-height'>
                Driving <strong className=' text-lime-500 dark:text-green-500'>Impact for Nigerian Students <br /> </strong> 
                through <strong className=' text-red-400'>Flexible Online Learning Experience</strong>
              </h2>
            </SlideUp>
            <SlideUp>
              <p className=' text-gray-800 dark:text-slate-400'>
              We are Shaping the educational system of Nigerian Students by equipping them with the neccessary knowledge to help them have fun while studying and to take advantage of AI to easily get the best knowledge. <br />
              This also Helps them connect easily with other students from different Institutions hence forstering community meetup. 
              </p>
            </SlideUp>
            <SlideUp>
                <ButtonGroup />
            </SlideUp>
        </div>
        {/* ========IMAGE======== */}
        <SlideUp>
        <div className='bg-green-700 dark:bg-green-900 dark:bg-opacity-40 rounded-lg h-[350px] md:h-[500px] w-[90vw] md:w-[400px] p-5 hover:opacity-90 hover:transition-all'>
            <div className=' absolute bg-lime-200 dark:bg-red-100 h-14 w-14 rounded-full top-[-11px] right-[-11px]'></div>
            <div className=' absolute bg-lime-200 dark:bg-red-100 h-14 w-14 rounded-full bottom-[-11px] left-[-11px]'></div>
            <Image 
            src= "https://app.3mtt.training/static/media/education-girl.b8a777ab708c361de94c.png"
            alt='students learning together' 
            height={1000} width={1000}
            className=' rounded-md absolute bottom-0 md:h-[350px] md:w-[400px]' />
        </div>
        </SlideUp>
    </section>
  )
}
