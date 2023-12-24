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

export function SelectCourse({ institutions, institution_id }: {
    institutions: InstitutionList,
    institution_id: number
}) {
  return (
    <Select name="institution" required defaultValue={institution_id as any}>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select an Institution for this Course" />
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
