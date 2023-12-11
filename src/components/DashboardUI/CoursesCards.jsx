import { Card } from '@nextui-org/react'
import { HiSquare3Stack3D } from "react-icons/hi2";

export default function CoursesCards() {
  return (
    <div className=' flex md:flex-row gap-4 flex-col '>
      <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
         <h1 className=' p-4 text-darkSlate font-semibold'>My Training Provider</h1>
         <hr className=' text-gray' />
         <div className=' flex items-center flex-col gap-3 p-3'>
            <HiSquare3Stack3D className=' text-green text-9xl hover:opacity-90' />
            <p>You have no training provider assigned yet</p>
         </div>
      </Card>
      <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
         <h1 className=' p-4 text-darkSlate font-semibold'>My Courses</h1>
         <hr className=' text-gray' />
         <div className=' flex items-center flex-col gap-3 p-3'>
            <HiSquare3Stack3D className=' text-green text-9xl hover:opacity-90' />
            <p>You have no courses yet</p>
         </div>
      </Card>
    </div>
  )
}
