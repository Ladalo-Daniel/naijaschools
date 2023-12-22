import { Button } from '@nextui-org/button'
import React from 'react'
import { buttonVariants } from '../ui/button'

export default function ButtonGroup() {
    const stats = [
        {
            data: "120K+",
            title: "Students"
        },
        {
            data: "1.2k+",
            title: "Schools"
        },
        {
            data: "1.1k+",
            title: "Resources"
        },
    ]
  return (
    <div className=' flex flex-col gap-9'>
    <div className='flex items-center gap-3 md:gap-9'>
        {/* <Avatar src='/images/human.png' isBordered hidden color='primary' /> */}
        <Button variant='faded' className={buttonVariants({variant: "link"})} color='primary'>Contact us</Button>
        <Button variant='faded' className='' color='danger'>Start Learning</Button>
    </div>
    <div className="">
        <ul className="flex flex-row gap-2 items-center justify-start md:flex-row flex-wrap md:flex-nowrap">
            {
                stats.map((item, idx) => (
                    <li key={idx} className=" w-[45%] md:w-1/2 text-center bg-slate-700 px-7 md:px-12 py-1  md:py-2 rounded-lg sm:w-auto">
                        <h4 className=" text-lg md:text-2xl text-white font-semibold">{item.data}</h4>
                        <p className=" mt-1 md:mt-2 text-gray-400 font-medium">{item.title}</p>
                    </li>
                ))
            }
        </ul>
    </div>
    </div>
  )
}
