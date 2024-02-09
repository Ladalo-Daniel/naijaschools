"use client"

import { Scholarship } from '@/supabase/scholarships'
import Image from 'next/image'
import React from 'react'
import { Card } from '@/components/ui/card'
import { shortMultiFormatDateString } from '@/lib/utils'
import { Calendar, User } from 'lucide-react'
import ProcessedScholarship from '../ProcessedScholarship'

function ScholarshipDetailComponent({scholarship}: {scholarship: Scholarship}) {
   
  return (
    <div className=' flex flex-col gap-4 mt-5'>
        <Image src={scholarship.image_url as string} width={1000} height={1000} className=' w-full rounded-md' alt='scholarship-detail-page-image' />
        <h1 className=' font-bold text-2xl'>{scholarship.title}</h1>
        <Card className=' p-5'>
        <div className=' flex items-center flex-row justify-between my-5'>
            <div className=' flex items-center flex-row gap-2 shadow-inner px-2 py-1 bg-zinc-100 dark:bg-zinc-800  rounded-md'>
            <User className=' text-green-500' size={16} />
            <h3>By Admin</h3>
            </div>
            <div className=' flex items-center flex-row gap-2 shadow-inner px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md'>
            <Calendar className=' text-green-500' size={16} />
            <h3>{shortMultiFormatDateString(scholarship.updated_at!)} ago</h3>
            </div>
        </div>
        <hr className=' mb-3' />
        <ProcessedScholarship content={scholarship.content!} />
        </Card>
    </div>
  )
}

export default ScholarshipDetailComponent