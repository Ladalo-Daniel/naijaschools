'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { SelectCourse } from "./SelectCourse"
import UpsertCourse from "./courses.actions"
import { SaveButton } from "./SaveCourseButton"
import { Course } from "@/supabase/courses"
import React from "react"
import { cn } from "@/lib/utils"
import { InstitutionList } from "@/supabase/institutions"

const initialState = {
    message: "",
    success: false
}  

export default function CourseForm({ className, setOpen, course, institutions }: { 
    className?: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    course?: Course,
    institutions?: InstitutionList,
    toggleOpen?: (id: number) => void 
  }) {
  const [state, formAction] = useFormState(UpsertCourse, initialState)
  // const { data: institutions, isPending } = useGetInstitutions()

  React.useEffect(() => {
    if (state?.message && state?.success) {
      toast.success(state?.message)
      setOpen(false)
    } else if (state?.message && !state?.success) {
     toast.error(state?.message)
    }
  }, [state])

  return (
    <form className={cn("grid items-start gap-4", className)} action={formAction}>
      <div className="grid gap-2">
        <SelectCourse institutions={institutions as InstitutionList} institution_id={course?.institution as number} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="name">Course Name</Label>
        <Input type="name" id="name" name="name" placeholder="Course Name." defaultValue={course?.name  || ""} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="code">Course Code</Label>
        <Input id="code" name="code" defaultValue={course?.code || ""} placeholder="Course code..." required/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="question_number">Total Number of Questions</Label>
        <Input id="question_number" type="number" name="question_number" defaultValue={course?.question_number || ""} placeholder="question_number..." required/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="total_marks">Possible Total Marks</Label>
        <Input id="total_marks" type="number" name="total_marks" defaultValue={course?.total_marks || ""} placeholder="total_marks..." required/>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input id="description" name="description" defaultValue={course?.description || ""} placeholder="description..."/>
      </div>
      <input type="hidden" name="upsert_id" value={course?.id || undefined} />
      <SaveButton />
    </form>
  )
}

