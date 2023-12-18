import { Card } from '@nextui-org/react'
import React from 'react'

export default function ProfileInfo() 
 {
  return (
    <>
        <Card className=' w-full bg-white p-5 rounded-md'>
            <h2 className=' text-darkGreen text-2xl p-4'>Profile Information</h2>
             <span className=' absolute w-[70%] md:w-[25%] bg-lime h-[0.20rem] top-[5.11rem]'></span>
            <hr className=' text-gray' />
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Name:</h1>
              <span className=' w-[60%]'>Ladalo Daniel</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Email:</h1>
              <span className=' w-[60%] text-xs md:text-base'>Balaladalo@gmail.com</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Address:</h1>
              <span className='w-[60%]'>No 30, Jos Street</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Age:</h1>
              <span className=' w-[60%]'>18-25</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Course:</h1>
              <span className=' w-[60%]'>Software Development</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Gender:</h1>
              <span className='w-[60%]'>Male</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Phone:</h1>
              <span className='w-[60%]'>09154029723</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>State of Residence:</h1>
              <span className='w-[60%]'>Federal Capital Territory</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>State of Origin:</h1>
              <span className='w-[60%]'>Federal Capital Territory</span>
            </div>
            <div className=' flex flex-row items-center gap-28 py-3'>
              <h1 className=' font-semibold w-[40%]'>Institution:</h1>
              <span className=' w-[60%]'>University of Abuja</span>
            </div>
          </Card>
    </>
  )
}
