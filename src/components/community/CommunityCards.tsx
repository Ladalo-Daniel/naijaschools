import { Card, CardContent } from "../ui/card";
import { SquareStackIcon} from 'lucide-react'

export default function CommunityCards() {
  return (
    <section className=" p-2 md:p-5">
      <div className=' flex md:flex-row gap-4 flex-col mb-4 '>
        <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
          <div className=" flex flex-col gap-1 p-4">
          <h1 className=' text-slate-900 font-semibold'>Community Notice</h1>
          <p className=' text-gray'>Check regularly for community notes</p>
          </div>
          <hr className=' text-gray' />
          <div className=' flex items-center flex-col gap-3 p-3'>
              <SquareStackIcon className=' text-green text-9xl hover:opacity-90' />
              <p>You have no training provider assigned yet</p>
          </div>
        </Card>
        <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
          <CardContent className=" flex flex-col gap-1 p-4">
            <h1 className=' text-slate-900 font-semibold'>Cluster Information</h1>
            <p className=' text-gray'>Check regularly for cluster Information</p>
          </CardContent>
          <hr className=' text-gray' />
          <div className=' flex items-center flex-col gap-3 p-3'>
              <SquareStackIcon className=' text-green text-9xl hover:opacity-90' />
              <p>You have no courses yet</p>
          </div>
        </Card>
      </div>
      <div className=' flex md:flex-row gap-4 flex-col mb-4 '>
        <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
          <div className=" flex flex-col gap-1 p-4">
          <h1 className=' text-slate-900 font-semibold'>Community Notice</h1>
          <p className=' text-gray'>Check regularly for community notes</p>
          </div>
          <hr className=' text-gray' />
          <div className=' flex items-center flex-col gap-3 p-3'>
              <SquareStackIcon className=' text-green text-9xl hover:opacity-90' />
              <p>You have no training provider assigned yet</p>
          </div>
        </Card>
        <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
          <div className=" flex flex-col gap-1 p-4">
            <h1 className=' text-slate-900 font-semibold'>Cluster Information</h1>
            <p className=' text-gray'>Check regularly for cluster Information</p>
          </div>
          <hr className=' text-gray' />
          <div className=' flex items-center flex-col gap-3 p-3'>
              <SquareStackIcon className=' text-green text-9xl hover:opacity-90' />
              <p>You have no courses yet</p>
          </div>
        </Card>
      </div>
      <div className=' flex md:flex-row gap-4 flex-col mb-4 '>
        <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
          <div className=" flex flex-col gap-1 p-4">
          <h1 className=' text-slate-900 font-semibold'>Community Notice</h1>
          <p className=' text-gray'>Check regularly for community notes</p>
          </div>
          <hr className=' text-gray' />
          <div className=' flex items-center flex-col gap-3 p-3'>
              <SquareStackIcon className=' text-green text-9xl hover:opacity-90' />
              <p>You have no training provider assigned yet</p>
          </div>
        </Card>
        <Card className=' bg-white rounded-md flex flex-col gap-3 py-4 md:w-1/2 text-slate'>
          <div className=" flex flex-col gap-1 p-4">
            <h1 className=' text-slate-900 font-semibold'>Cluster Information</h1>
            <p className=' text-gray'>Check regularly for cluster Information</p>
          </div>
          <hr className=' text-gray' />
          <div className=' flex items-center flex-col gap-3 p-3'>
              <SquareStackIcon className=' text-green text-9xl hover:opacity-90' />
              <p>You have no courses yet</p>
          </div>
        </Card>
      </div>
    </section>
  )
}
