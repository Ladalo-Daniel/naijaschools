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
import { InstitutionList } from "@/supabase/institutions"

export default function SelectCourseInstitution({ institutions, institution_id, institution_name }: {
    institutions: InstitutionList,
    institution_id?: number,
    institution_name?: string
}) {
  return (
    <Select name="institution" required defaultValue={institution_id as any}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder={"Select an institution for this course."} />
        <SelectValue>{institution_name}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Institutions</SelectLabel>
          {
            institutions?.map(institution => (
                <SelectItem value={institution?.id?.toString()} key={institution.id}>
                    {institution.name}
                </SelectItem>
            ))
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
