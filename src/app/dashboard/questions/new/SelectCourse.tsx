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
import { Question } from "@/supabase/questions"

export function SelectCourse({ courses, question, course_id }: {
    courses: CourseList,
    question?: Question,
    course_id?: number

}) {
  const [courseId, setCourseId] = React.useState(question?.course_id || 0)

  return (
    <section className="flex flex-col gap-3 flex-1 mt-3">
    {!question?.id && <Select name="course" required defaultValue={courseId as any || ""} onValueChange={v => setCourseId(parseInt(v))}>
      <SelectTrigger className="md:w-[300px] w-full">
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
    </Select>}
    <MultiAddQuestionsForm course_id={courseId} question={question} />
    </section>
  )
}
