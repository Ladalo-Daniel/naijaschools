import Profile from '@/app/profile/page'
import { Avatar, Card } from '@nextui-org/react'
import React from 'react'
import ProfileInfo from './ProfileInfo'

export default function ProfileCard() {
  return (
    <section  className=' p-2 md:p-5'>
        <div className=' flex flex-col gap-4'>
          <Card className=' w-full bg-white p-5 rounded-md flex flex-row items-center gap-3 justify-between'>
            <div className=' flex items-center flex-row gap-3'>
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" name='Ladalo' className='' height={20} width={20} alt='Profile' />
            <div className=' flex flex-col'>
              <span className=' text-slate text-small md:text-lg'>Ladalo Daniel</span>
              <span className=' text-slate text-small md:text-xl'>FE/23/77645780</span>
            </div>
            </div>
            <h2 className=' text-sm md:text-2xl text-black'>University of Abuja</h2>
          </Card>
          <ProfileInfo />
        </div>
    </section>
  )
}
