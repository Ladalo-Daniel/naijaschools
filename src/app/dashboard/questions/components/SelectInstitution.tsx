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
import { useRouter } from "next/navigation"
import { Question } from "@/supabase/questions"

export default function SelectInstitution({ institutions, institution_id, question }: {
    institutions: InstitutionList,
    institution_id?: number,
    institution_name?: string,
    question?: Question
}) {
  const [institution, setInstitution] = React.useState('')
  const router = useRouter()

  const handleValueChange = (value: string) => {
    setInstitution(value)
    if (value) {
        setInstitution(value)
        router.push(`?institution=${value}`)
      }
  } 

  return (
    <div className="px-2">
      <Select name="institution" required defaultValue={institution || institution_id?.toString() || ""}  onValueChange={v => handleValueChange(v)}>
        <SelectTrigger className="w-full md:w-[300px]">
          <SelectValue placeholder={"Select an institution for this course."} />
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
    </div>
  )
}
