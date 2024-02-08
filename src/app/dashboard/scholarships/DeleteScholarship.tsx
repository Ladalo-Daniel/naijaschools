'use client'

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@nextui-org/button"
import { Trash } from "lucide-react"
import React from "react"
import DeleteButton from "../components/DeleteButton"
import { Scholarship, deleteScholarship } from "@/supabase/scholarships"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


const initialState = {
  message: "",
  success: false,
  pending: false
}



  
export default function DeleteScholarship({scholarship}: {scholarship: Scholarship}) {

  const [state, formAction] = useFormState(deleteScholarship, initialState)
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    if (state?.message && state?.success) {
    toast.success(state?.message)
    setOpen(false)
    router.refresh()
    } else if (state?.message && !state?.success) { 
    toast.error(state?.message)
    }
   }, [state])

   

   return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild className="p-0">
          <Button variant='flat' color='danger' isIconOnly ><Trash  size={15} /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
          <form action={formAction}>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure you want to delete <b>#{scholarship?.title}</b>?</AlertDialogTitle>
                  <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this Article and remove it&#39;s data from our servers.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <DeleteButton />
              </AlertDialogFooter>
              <input type="hidden" name="id" value={scholarship?.id!}/>
          </form>
      </AlertDialogContent>
    </AlertDialog>
  )
  }
  