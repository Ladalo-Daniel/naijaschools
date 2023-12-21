import { CardContent, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getProfile } from '@/supabase'
import { Avatar } from '@nextui-org/avatar'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { format } from 'date-fns'
import React from 'react'

const ProfileCard = async () => {
    const profile = await getProfile()
  return (
    <div className='py-6'>
        <div className='flex flex-col gap-2 md:gap-3'>
            <Avatar src='' name={profile?.data?.username} size='lg' />
            <Separator className='my-2'/>
            <Card>
                <CardHeader>
                    <CardTitle>{profile?.data?.email}</CardTitle>
                </CardHeader>
                <CardBody>
                    <CardContent className=''>
                    <h2 className='font-bold'>Username</h2>
                    <p className='text'>{profile?.data?.username}</p>
                    </CardContent>
                </CardBody>
            </Card>
            {/* <div className='flex justify-between py-5'>
                <table className='flex flex-col font-medium flex-1 gap-3 md:gap-4'>
                  <>Username</>
                  <p>Email</p>
                  <p>Biography</p>
                  <p>Community ID</p>
                  <p>D.O.B</p>
                  <p>Institution</p>
                </table>
                <div className='flex flex-col gap-3 md:gap-4 flex-1'>
                  <h2 className='text-2xl font-medium'>{profile?.data?.username}</h2>
                  <p className='text-muted-foreground'>{profile?.data?.email}</p>
                  <p className='text-muted-foreground'>{profile?.data?.bio || "-"}</p>
                  <p className='text-muted-foreground'>{profile?.data?.community_id || "-"}</p>
                  <p className='text-muted-foreground font-medium'>{format(new Date(profile?.data?.dob),"yyyy-mm-dd") || "-"}</p>
                  <p className='text-muted-foreground'>{profile?.data?.institution || "-"}</p>
                </div>
            </div>
            <Separator className='my-2'/> */}
            <p className='text-primary text-sm py-2'>Last updated on {format(new Date(profile?.data?.updated_at),"yyyy-mm-dd") || "-"}.</p>

        </div>
    </div>
  )
}

export default ProfileCard