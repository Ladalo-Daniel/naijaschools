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
import { Trash2 } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import { useFormState } from "react-dom"
import DeleteButton from "../../components/DeleteButton"
import { deleteUser } from "../students.actions"
import { User } from "@/supabase/user"
import { Button } from "@/components/ui/button"


const initialState = {
    message: "",
    success: false,
    pending: false
}  
  
export default function DeleteUser({ profile }: { profile: User }) {
    const [state, formAction] = useFormState(deleteUser, initialState)
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
          <Button variant={'destructive'} className='gap-2'><Trash2 size={15} color='red' /> Delete this User</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <form action={formAction}>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure you want to delete the user <b>{profile?.username}</b>?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this User and remove his/her data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <DeleteButton />
                </AlertDialogFooter>
                <input type="hidden" name="id" value={profile?.id!}/>
            </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  