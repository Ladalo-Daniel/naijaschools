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

export default function SelectInstitution({ institutions, institution_id, institution_name }: {
    institutions: InstitutionList,
    institution_id?: number,
    institution_name?: string
}) {
  const [institution, setInstitution] = React.useState('')
  const router = useRouter()
  
  React.useEffect(() => {
    router.push(`?institution=${institution}`)
  }, [institution])

  return (
    <Select name="institution" required defaultValue={institution_id as any} onValueChange={v => setInstitution(v)}>
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
  )
}
