"use client"
import React, { useState } from 'react'
import { Professions } from '../utils';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function JobProfessions() {

  const [seeAll, setSeeAll] = useState(false)

  const toggleSeeAll = () => {
    setSeeAll(!seeAll)
  }

  return (
    <div className=' flex flex-col gap-5'>
     <div className=' grid md:grid-cols-2 gap-3'>
        {
          seeAll ? 
          (
            Professions?.map((p, idx) => (
                <Card key={idx} className='p-4 hover:shadow-md'>
                  <Link href={p.queryLink} className=' flex flex-row items-center gap-4'>
                    <div className=' flex justify-center p-2 rounded-lg bg-green-500 text-white text-4xl w-[50px] h-[50px]'>
                     <h1 className=' self-center '>{p.logo}</h1>
                    </div>
                    <h3 className=' text-2xl'>{p.title}</h3>
                  </Link>
                </Card>
            ))

          ) :
          (
            Professions?.slice(0, 14)?.map((p, idx) => (
                <Card key={idx} className='p-4 hover:shadow-md'>
                  <Link href={p.queryLink} className=' flex flex-row items-center gap-4'>
                    <div className=' flex justify-center p-2 rounded-lg bg-green-500 text-white text-4xl w-[50px] h-[50px]'>
                     <h1 className=' self-center '>{p.logo}</h1>
                    </div>
                    <h3 className=' text-2xl'>{p.title}</h3>
                  </Link>
                </Card>
            ))
            )
          }
     </div>
     <Button onClick={toggleSeeAll} className={seeAll ? "self-center bg-yellow-600 text-white hover:bg-yellow-500" : "self-center"}>{seeAll ? "See Less" : "See All"}</Button>
    </div>
  )
}

export default JobProfessions