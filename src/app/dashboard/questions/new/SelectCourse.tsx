"use client"

import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CourseList } from "@/supabase/courses"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import MultiAddQuestionsForm from "./MultiAddQuestionsForm"

export function SelectCourse({ courses, course_id, course_name }: {
    courses: CourseList,
    course_id?: number,
    course_name?: string
}) {
    const [courseId, setCourseId] = React.useState(0)

  return (
    <>
    <Select name="course" required defaultValue={course_id as any} onValueChange={v => setCourseId(parseInt(v))}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder={"Select a course for these Questions."} />
      </SelectTrigger>
      <SelectContent>
        {courses?.length ? <SelectGroup>
          <SelectLabel>Courses</SelectLabel>
          {
            courses?.map(course => (
                <SelectItem value={course?.id?.toString()} key={course.id}>
                    {course.name}
                </SelectItem>
            ))
          }
        </SelectGroup> : 
        <p className="text-muted-foreground tracking-tighter p-2 w-[280px]">No course exists for this institution yet. You can add it at the <Link className={buttonVariants({
            variant: "link",
            className: "px-1"
          })} href={'/dashboard/courses'}>Courses Page</Link></p>
        }

      </SelectContent>
    </Select>
    <MultiAddQuestionsForm course_id={courseId} />
    </>
  )
}
