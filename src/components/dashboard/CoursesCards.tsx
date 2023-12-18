import { StackIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "../ui/card";

export default function CoursesCards() {
  return (
    <div className=' flex md:flex-row gap-4 flex-col '>
      <Card className='rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
         <h1 className=' p-4 text-darkSlate font-semibold text-primary'>My Training Provider</h1>
         <hr className=' text-gray' />
         <CardContent className=' flex items-center flex-col gap-3 p-3'>
            <StackIcon className=' text-green text-9xl hover:opacity-90' />
            <p className="text-muted-foreground">You have no training provider assigned yet</p>
         </CardContent>
      </Card>
      <Card className=' rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
         <h1 className=' p-4 text-darkSlate font-semibold text-primary'>My Courses</h1>
         <hr className=' text-gray' />
         <CardContent className=' flex items-center flex-col gap-3 p-3'>
            <StackIcon className=' text-green text-9xl hover:opacity-90' />
            <p>You have no courses yet</p>
         </CardContent>
      </Card>
    </div>
  )
}
