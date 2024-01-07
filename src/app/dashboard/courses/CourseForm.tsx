'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import SelectCourseInstitution from "./SelectCourseInstitution"
import UpsertCourse from "./courses.actions"
import { SaveButton } from "./SaveCourseButton"
import { Course } from "@/supabase/courses"
import React from "react"
import { cn } from "@/lib/utils"
import { InstitutionList } from "@/supabase/institutions"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { faculties } from "@/lib/faculties"

const initialState = {
    errors: {},
    message: "",
    success: false
}  

export default function CourseForm({ className, setOpen, course, institutions, toggleOpen, institutionId }: { 
    className?: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    course?: Course,
    institutions?: InstitutionList,
    toggleOpen?: (id: number) => void,
    institutionId?: string, 
  }) {
  const [state, formAction] = useFormState(UpsertCourse, initialState)

  React.useEffect(() => {
    if (state?.message && state?.success) {
      toast.success(state?.message)
      setOpen?.(prev => !prev)
      toggleOpen?.(course?.id as number)
    } else if (state?.message && !state?.success) {
     toast.error(state?.message)
    }
  }, [state])

  return (
    <form className={cn("grid items-start gap-4", className)} action={formAction}>
      <div className="grid gap-2">
        <SelectCourseInstitution institutions={institutions as InstitutionList} institution_name={course?.name || ""} institution_id={course?.institution as number || institutionId as any} />
      </div>
      <div className="grid gap-2">
        <Select defaultValue={course?.faculty || ""} name="faculty">
            <SelectTrigger>
              <SelectValue placeholder="Select a valid faculty." />
            </SelectTrigger>
          <SelectContent>
            {
              faculties.map(f => (
                <SelectItem value={f} key={f}>{f}</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
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
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={course?.description || ""} placeholder="description..."/>
      </div>
      <input type="hidden" name="upsert_id" value={course?.id || undefined} />
      <SaveButton />
    </form>
  )
}

