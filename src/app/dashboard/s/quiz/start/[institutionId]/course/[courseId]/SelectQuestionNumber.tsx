'use client'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'


const SelectQuestionNumber = () => {
    const router = useRouter()

    const [noq, setNOQ] = useState('')

    const handleValueChange = (v: string) => {
        if (v) {
            setNOQ(v)
            router.push(`?noq=${v}`)
            router.refresh()
        }
    }
    return (
    <div className="">
      <Select name="institution" required defaultValue={noq || ""}  onValueChange={v => handleValueChange(v)}>
        <SelectTrigger className="w-full md:w-[300px]">
          <SelectValue placeholder={"Select the number of questions you want to answer."} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Number of Questions</SelectLabel>
            {
              [5, 10, 20, 30, 40, 50, 60].map(_ => (
                  <SelectItem value={_.toString()} key={_}>
                      {_}
                  </SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectQuestionNumber