'use client'

import * as React from "react"

import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import CourseForm from "./CourseForm"
import { PlusIcon } from "lucide-react"
import { InstitutionList } from "@/supabase/institutions"

export default function AddCourseForm({ institutions }: {
  institutions: InstitutionList
}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-fit"><PlusIcon /> Add Course</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add a course</DialogTitle>
            <DialogDescription>
              Add a course and Click save when {"you're"} done.
            </DialogDescription>
          </DialogHeader>
          <CourseForm setOpen={setOpen} institutions={institutions}/>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline"><PlusIcon /> Add Course</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add a course</DrawerTitle>
          <DrawerDescription>
            Add a new course here and click save when {"you're"} done.
          </DrawerDescription>
        </DrawerHeader>
        <CourseForm className="px-4" setOpen={setOpen} institutions={institutions as InstitutionList}/>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
