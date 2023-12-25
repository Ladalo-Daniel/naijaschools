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
import { Trash2 } from "lucide-react"
import { deleteInstitution } from "./institution.actions"
import React from "react"
import { toast } from "sonner"
import { useFormState } from "react-dom"
import DeleteButton from "../components/DeleteButton"
import { Institution } from "@/supabase/institutions"


const initialState = {
    message: "",
    success: false,
    pending: false
}  
  
export default function DeleteInstitution({ institution }: { institution: Institution}) {
    const [state, formAction] = useFormState(deleteInstitution, initialState)
    const [open, setOpen] = React.useState(false)

    React.useEffect(() => {
        if (state?.message && state?.success) {
        toast.success(state?.message)
        setOpen(false)
        } else if (state?.message && !state?.success) {
        toast.error(state?.message)
        }
    }, [state])

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button isIconOnly className='bg-transparent'><Trash2 size={15} color='red' /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <form action={formAction}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure you want to delete <b>{institution?.name}</b>?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this institution and remove it&#39;s data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <DeleteButton />
                </AlertDialogFooter>
                <input type="hidden" name="id" value={institution?.id!}/>
            </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  