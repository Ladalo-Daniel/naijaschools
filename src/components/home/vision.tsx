import Image from "next/image";

export default function Vision() {
  return (
    <div className=" flex flex-col md:h-[700px] md:w-full rounded-lg bg-slate-100 justify-between p-5 md:p-10 text-sm text-gray-600 leading-5">
        {/* VISION+++MISION */}
       <div className=" flex flex-row items-center justify-between gap-3 md:gap-7">
          <div className=" w-1/2 bg-orange-50 rounded-md p-2 md:p-4 shadow-md">
            <h2 className=" text-green-600">Our Vision</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio sint repellendus corrupti velit</p>
          </div>
          <div className=" w-1/2 bg-orange-50 rounded-md p-2 md:p-4 shadow-md">
            <h2 className=" text-green-600">Our Mision</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio sint repellendus corrupti velit</p>
          </div>
       </div>
        {/* CENTER++++IMAGE */}
        <div className=" self-center animate-spinner ring-1 rounded-full ring-lime-200">
              <Image
               alt="section two image"
               height={1000}
               width={1000}
               src="https://img.freepik.com/free-vector/red-dart-arrow-hitting-target-center-dartboard_91128-1576.jpg?size=626&ext=jpg&ga=GA1.1.1035386768.1682762339&semt=ais"
               className=" w-[100px] h-[100px] rounded-full"
               />
        </div>
        {/* VALUES+++CULTURE */}
       <div className=" flex flex-row gap-3 md:gap-7 items-center justify-between">
          <div className=" w-1/2 bg-orange-50 rounded-md p-2 md:p-4 shadow-md">
            <h2 className=" text-green-600">Our Values</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio sint repellendus corrupti velit</p>
          </div>
          <div className=" w-1/2 bg-orange-50 rounded-md p-2 md:p-4 shadow-md">
            <h2 className=" text-green-600">Our Culture</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione optio sint repellendus corrupti velit</p>
          </div>
       </div>
       <div className=' absolute bg-lime-200 dark:bg-red-100 h-14 w-14 rounded-full bottom-[-11px] left-[-26px] md:left-[-11px]'></div>
       <div className=' absolute bg-lime-200 dark:bg-red-100 h-14 w-14 rounded-full top-[-11px] right-[-26px] md:right-[-11px]'></div>
    </div>
  )
}
