"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import MiniLoader from '@/components/MiniLoader'

function JobSearch() {
  const [query, setQuery] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

  const handleSearch = (e:any) => {
    e.preventDefault()
    if(query.trim() !== "" && query.length > 1){
      router.push(`job-listings/prof/?q=${query} Jobs in Nigeria`)
      setSuccess(true)
      setError(false)
    } else{
      setError(true)
    }
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm items-center space-x-2 self-center">
    <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center space-x-2 self-center">
      <Input 
      type="text" 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Start typing"
      className=' p-2 py-4 h-9'
       />
      <Button type="submit">{success ? <MiniLoader /> : "Search"}</Button>
    </form>
    {error && <p className=' text-red-500'>Search must me be equal or more than 2 characters</p>}
    </div>
  )
}

export default JobSearch