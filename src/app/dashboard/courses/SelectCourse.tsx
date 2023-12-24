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
import { Database } from "@/types/supabase"

export function SelectCourse({ institutions, institution_id }: {
    institutions: Database['public']['Tables']['institutions']['Row'][],
    institution_id: number
}) {
  return (
    <Select name="institution" required defaultValue={"institutions[institution_id]?.name || ''"}>
      <SelectTrigger className="w-[280px]">
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
