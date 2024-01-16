import React from 'react'
import MaxWrapper from '@/components/MaxWrapper'
import BackButton from '@/components/shared/BackButton'
import ProfilePageComponent from './ProfilePageComponent'

const ProfilePage = async ({
    params: { username }
}: { params: { username: string }}) => {
  return (
    <MaxWrapper className='bg-backgroud p-5 max-w-5xl'>
        <BackButton />

        <section className="flex flex-col gap-3">
            <ProfilePageComponent username={username} />
        </section>
    </MaxWrapper>
  )
}

export default ProfilePage