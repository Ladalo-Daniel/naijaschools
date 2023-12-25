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
import { Edit2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import DeleteCourse from './DeleteCourse'
import { Course, CourseList } from '@/supabase/courses'
import CourseForm from './CourseForm'
import { InstitutionList } from '@/supabase/institutions'


const CourseTable = ({ courses, institutions }: {courses: CourseList, institutions: InstitutionList}) => {
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
            <TableCell>Name</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Question_number</TableCell>
            <TableCell>Total_marks</TableCell>
            <TableCell>Institution</TableCell>
            <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((i, j) => (
          <TableRow key={j}>
            <TableCell className="font-medium">{j+1}</TableCell>
            <TableCell>{i.name}</TableCell>
            <TableCell>{i.code}</TableCell>
            <TableCell>{i.description}</TableCell>
            <TableCell>{i.question_number}</TableCell>
            <TableCell>{i.total_marks}</TableCell>
            <TableCell>{institutions.find(idx => idx.id === i.institution)?.name}</TableCell>
            <TableCell className="text-right flex items-center gap-2">

              <DeleteCourse course={i}/>

                 <Dialog open={openStates[i.id]} onOpenChange={() => toggleOpen(i.id)}>
                  { isDesktop &&
                  <>
                    <DialogTrigger asChild>
                      <Button isIconOnly className='bg-transparent'><Edit2 size={15} color='blue' /></Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                        <DialogTitle>Edit Course</DialogTitle>
                        </DialogHeader>
                        <CourseForm setOpen={setOpen} course={i as Course} toggleOpen={() => toggleOpen(i.id)} institutions={institutions}/>
                    </DialogContent>
                  </>}
                </Dialog>

                {!isDesktop &&  <Drawer open={openStates[i.id]} onOpenChange={() => toggleOpen(i.id)}>
                    <DrawerTrigger asChild>
                      <Button isIconOnly className='bg-transparent'><Edit2 size={15} color='blue' /></Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="text-left">
                        <DrawerTitle>Edit Course</DrawerTitle>
                        </DrawerHeader>
                        <CourseForm className="px-4" course={i as any} setOpen={setOpen} toggleOpen={() => toggleOpen(i.id)} institutions={institutions as InstitutionList}/>
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

export default CourseTable