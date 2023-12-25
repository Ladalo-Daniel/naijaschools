'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
  } from "@/components/ui/drawer"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import SwitchForm from './SwitchRoleForm'
import { useGetProfileById, useMakeAdmin } from '@/lib/react-query'
import { User } from '@/supabase/user'
  

const AdminStudentDetailView = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get("id")

    const [open, setOpen] = React.useState<boolean>(Boolean(id))
    const { mutate: makeAdmin, isPending } = useMakeAdmin()
    const { data: profile } = useGetProfileById(id || "")
        
    useEffect(() => {
        setOpen(Boolean(id))
      }, [id])
      

    if (!id) {
        return <></>
    }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className='border-background'>
        <div className="mx-auto w-full max-w-md p-4">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription className='mx-auto py-6'>
                <Image alt='profile' src={profile?.data?.image_url || '/icons/profile-placeholder.svg'} height={400} className='w-40 h-40 rounded-full object-cover' width={400}  />
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 py-1 pb-0">
            <div className="flex items-center justify-center space-x-2">
            </div>
            <div className="mt-3 h-[240px]">
              <SwitchForm makeAdmin={makeAdmin} setOpen={setOpen} profile={profile?.data as User} userId={id} isPending={isPending} />
            </div>
          </div>
          <DrawerFooter className='my-6 py-6'>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>

  )
}

export default AdminStudentDetailView
