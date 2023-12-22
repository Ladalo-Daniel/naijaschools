import { CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getProfile } from '@/supabase/user'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { format } from 'date-fns'
import { BookOpenText, BuildingIcon, CalendarDaysIcon, MailIcon, UserRound, Users } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const ProfileCard = async () => {
    const profile = await getProfile()
  return (
    <div className='py-6'>
        <div className='flex flex-col gap-2 md:gap-3'>
            <div className='flex justify-center items-center'>
            <Image
              src={profile?.data?.image_url || "/icons/profile-placeholder.svg"} 
              alt={profile?.data?.username!} 
              width={1000}
              height={1000}
              className='w-40 h-40 rounded-full object-cover'
            />
            </div>
            <Separator className='my-2'/>
            <Card className='p-4 border-zinc-500 bg-gradient-to-tr dark:bg-gradient-dark'>
                <CardBody className='flex flex-col gap-3'>
                    <CardContent className=''>
                      <h2 className='font-semibold flex items-center gap-2 mb-1 mt-1'><MailIcon size={15}/> Email</h2>
                      <p className='text'>{profile?.data?.email}</p>
                    </CardContent>
                    <CardContent className=''>
                      <h2 className='font-semibold flex items-center gap-2 mb-1 mt-1'><UserRound size={15}/> Username</h2>
                      <p className='text'>{profile?.data?.username}</p>
                    </CardContent>
                    <CardContent className=''>
                      <h2 className='font-semibold flex items-center gap-2 mb-1 mt-1'><BookOpenText size={15}/> Biography</h2>
                      <p className='text'>{profile?.data?.bio || "-"}</p>
                    </CardContent>
                    <CardContent className=''>
                      <h2 className='font-semibold flex items-center gap-2 mb-1 mt-1'><Users size={15}/> Community ID</h2>
                      <p className='text'>{profile?.data?.community_id || "-"}</p>
                    </CardContent>
                    <CardContent className=''>
                      <h2 className='font-semibold flex items-center gap-2 mb-1 mt-1'><CalendarDaysIcon size={15} /> D. O. B.</h2>
                      <p className='text'>{format(new Date(profile?.data?.dob as string),"yyyy-mm-dd") || "-"}</p>
                    </CardContent>
                    <CardContent className=''>
                      <h2 className='font-semibold flex items-center gap-2 mb-1 mt-1'><BuildingIcon size={15} /> Institution</h2>
                      <p className='text'>{profile?.data?.institution || "-"}</p>
                    </CardContent>
                </CardBody>
            </Card>
            <p className='text-primary text-sm py-2'>Last updated on {format(new Date(profile?.data?.updated_at!),"yyyy-mm-dd") || "-"}.</p>

        </div>
    </div>
  )
}

export default ProfileCard