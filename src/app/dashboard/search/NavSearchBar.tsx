'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { useRouter, useSearchParams } from 'next/navigation'

export default function NavSearchBar() {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = () => {
    router.push(`/dashboard/search?q=${search}`)
    setOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const handleDialogKeyDown = (event: KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
      event.preventDefault()
      setOpen(true)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleDialogKeyDown)

    return () => {
      window.removeEventListener('keydown', handleDialogKeyDown)
    }
  }, [])

  const sP = useSearchParams()
  const q = sP.get("q") || ""

  const closeDialog = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center gap-1.5 text-muted-foreground md:mr-2 mr-0.5 border rounded-md hover:animate-appearance-in hover:opacity-60 p-2 cursor-pointer">
          <SearchIcon size={18} />
          <span className='hidden lg:block'>Search ... Ctrl/Cmd + K</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search for anything...</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="">
              Your search
            </Label>
            <Input
              id="query"
              className="w-full"
              defaultValue={q}
              placeholder="Search for anything on naijaschools..."
              onChange={(e) => setSearch(e.target?.value)}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSearch}>
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
