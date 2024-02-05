import { Card } from '@/components/ui/card'
import { ScholarshipList } from '@/supabase/scholarships'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Calendar, Tag, UserIcon } from 'lucide-react'
import { shortMultiFormatDateString } from '@/lib/utils'
import ProcessedScholarship from './ProcessedScholarship'
import EditScholarship from './EditScholarship'
import DeleteScholarship from './DeleteScholarship'
import { User } from '@/supabase/user'

 function ScholarshipReal({scholarships, profile}: {scholarships: ScholarshipList, profile: User}) {

  return (
    <div className=''>
        {scholarships?.map((item, idx)=> (
            <Card key={idx} className=' flex flex-col md:flex-row gap-5 p-5 mb-5'>
                <Image src={item.image_url as string} width={1000} height={1000} alt='scholarships-image' className=' md:w-1/2 w-full h-[300px] rounded-md object-cover hover:translate-y-1' />
                <div className=' flex flex-col gap-3 md:w-1/2'>
                <Link href={`/dashboard/scholarships/${item.id}`} className=' hover:text-yellow-600 font-semibold'>{idx + 1}. {item.title}</Link>
                <div className=' flex flex-row gap-2 items-center'>
                  <Tag className=' text-green-600' size={14} />
                  <Link href="#" className=' text-medium hover:text-yellow-600'>{item.tags}</Link>
                </div>
                <ProcessedScholarship content={`${item.content!.slice(0, 200)}...`} /> <Link href={`/dashboard/scholarships/${item.id}`} className=' text-yellow-700'>READ MORE</Link>
                <div className=' flex items-center flex-row justify-between'>
                  <div className=' flex items-center flex-row gap-2 shadow-inner px-2 py-1 bg-zinc-100 dark:bg-zinc-800  rounded-md'>
                    <UserIcon className=' text-green-500' size={16} />
                    <h3>By Admin</h3>
                  </div>
                  <div className=' flex items-center flex-row gap-2 shadow-inner px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-md'>
                    <Calendar className=' text-green-500' size={16} />
                    <h3>{shortMultiFormatDateString(item.updated_at!)} ago</h3>
                  </div>
                </div>
                {profile?.role === "admin" && 
                 (
                 <div className=' flex flex-row items-center justify-between'>
                   <EditScholarship scholarship={item} />
                   <DeleteScholarship scholarship={item} />
                </div>
                )
                }
                </div>
            </Card>
        ))}
    </div>
  )
}

export default ScholarshipReal