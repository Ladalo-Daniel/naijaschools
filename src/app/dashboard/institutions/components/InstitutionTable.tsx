'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button } from '@nextui-org/button'
import { Edit2, EyeIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InstitutionForm } from './AddInstitutionForm'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import DeleteInstitution from './DeleteInstitution'
import { InstitutionList } from '@/supabase/institutions'
import Link from 'next/link'
import { User } from '@/supabase/user'


const InstitutionTable = ({ institutions, profile }: {institutions: InstitutionList, profile?: User}) => {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [openStates, setOpenStates] = React.useState<{ [key: number]: boolean }>({})

  const toggleOpen = (id: number) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }))
  }

  return (
     <Table className='py-5'>
      <TableCaption>End of list. You&#39;re all caught up.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">S/N</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Desc</TableHead>
          <TableHead className="">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {institutions.map((i, j) => (
          <TableRow key={j}>
            <TableCell className="font-medium">{j+1}</TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{i.description}</TableCell>
            <TableCell className="text-right flex items-center gap-2">

            {profile?.role === 'admin' && <>
              <DeleteInstitution institution={i}/>

                 <Dialog open={openStates[i.id]} onOpenChange={() => toggleOpen(i.id)}>
                  { isDesktop &&
                  <>
                    <DialogTrigger asChild>
                      <Button isIconOnly className='bg-transparent'><Edit2 size={15} color='blue' /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Edit Institution</DialogTitle>
                        </DialogHeader>
                        <InstitutionForm setOpen={setOpen} toggleOpen={() => toggleOpen(i.id)} institution={i as any}/>
                    </DialogContent>
                  </>}
                </Dialog>

                {!isDesktop &&  <Drawer open={openStates[i.id]} onOpenChange={() => toggleOpen(i.id)}>
                    <DrawerTrigger asChild>
                      <Button isIconOnly className='bg-transparent'><Edit2 size={15} color='blue' /></Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                        <DrawerTitle>Edit Institution</DrawerTitle>
                        </DrawerHeader>
                        <InstitutionForm className="px-4" institution={i as any} toggleOpen={() => toggleOpen(i.id)} setOpen={setOpen} />
                        <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                    </Drawer>}
                  </>} 

                  <Button as={Link} href={`/dashboard/institutions/${i.id}`} isIconOnly className='bg-transparent'><EyeIcon size={15} className='text-primary' /></Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default InstitutionTable

