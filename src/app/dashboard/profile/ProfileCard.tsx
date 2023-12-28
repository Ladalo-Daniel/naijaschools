import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getInstitutions } from '@/supabase/institutions'
import { User } from '@/supabase/user'
import { format } from 'date-fns'
import Image from 'next/image'
import React from 'react'

const ProfileCard = async ({ profile }: { profile: User}) => {
    const {data: institutions} = await getInstitutions()

    const institutionName = institutions?.find(institution => institution.id === parseInt(profile.institution!))?.name
  return (
    <div className='py-6'>
      <div className='flex flex-col gap-3 shadow-sm'>
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-4'>
                <CardTitle>
                    Profile Picture
                    <Separator className='dark:bg-zinc-700 mt-2' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
              <div className='flex justify-center items-center'>
                <Image
                  src={profile?.image_url || "/icons/profile-placeholder.svg"} 
                  alt={profile?.username!} 
                  width={1000}
                  height={1000}
                //   onLoad={() => <Skeleton className='w-40 h-40 rounded-full' />} // Client based
                  className='w-40 h-40 rounded-full object-cover'
                />
              </div>
            </CardContent>
        </Card>
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-4'>
                <CardTitle>
                    Account Information
                    <Separator className='dark:bg-zinc-700 mt-2' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Username:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.username!}</span>
                </CardDescription>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Email:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.email!}</span>
                </CardDescription>
            </CardContent>
        </Card>
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-4'>
                <CardTitle>
                    Personalized Information
                    <Separator className='dark:bg-zinc-700 mt-2' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>First Name:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.first_name! || '-'}</span>
                </CardDescription>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Last Name:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.last_name! || '-'}</span>
                </CardDescription>
            </CardContent>
        </Card>
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-4'>
                <CardTitle>
                    About
                    <Separator className='dark:bg-zinc-700 mt-2' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Bio:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.bio || '-'}</span>
                </CardDescription>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Date of Birth:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{format(new Date(profile?.dob as string),"yyyy-mm-dd") || "-"}</span>
                </CardDescription>
            </CardContent>
        </Card>
        <Card className='p-2 dark:bg-secondary border bg-background'>
            <CardHeader className='my-4'>
                <CardTitle>
                    Other Information
                    <Separator className='dark:bg-zinc-700 mt-2' />
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-col gap-3'>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Community ID:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{profile?.community_id || '-'}</span>
                </CardDescription>
                <CardDescription className='flex justify-between md:items-center md:flex-row flex-col gap-2'>
                    <span className='font-semibold flex-1'>Institution:</span>
                    <span className='p-4 rounded-md border flex-1 dark:border-zinc-700 shadow'>{institutionName || "-"}</span>
                </CardDescription>
            </CardContent>
        </Card>
        </div>
        {/* <p className='text-primary text-sm py-2'>Last updated on {format(new Date(profile?.updated_at!),"yyyy-mm-dd") || "-"}.</p> */}
        </div>
  )
}

export default ProfileCard