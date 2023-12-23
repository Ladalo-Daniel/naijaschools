'use client'

import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Database } from '@/types/supabase'
import { Button } from '@nextui-org/button'
import { Edit2, Trash2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { InstitutionForm } from './AddInstitutionForm'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import DeleteInstitution from './DeleteInstitution'


const InstitutionTable = ({ institutions }: {institutions: Database['public']['Tables']['institutions']['Row'][]}) => {
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
                        <InstitutionForm setOpen={setOpen} institution={i as any}/>
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
                        <InstitutionForm className="px-4" institution={i as any} setOpen={setOpen} />
                        <DrawerFooter className="pt-2">
                        <DrawerClose asChild>
                            <Button variant="ghost">Cancel</Button>
                        </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                    </Drawer>}

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default InstitutionTable


{/* <TableFooter>
  <TableRow>
    <TableCell colSpan={3}>Total</TableCell>
    <TableCell className="text-right">$2,500.00</TableCell>
  </TableRow>
</TableFooter> */}