'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { Database } from "@/types/supabase"
import { Button } from "@nextui-org/button"
import { Loader2, Trash2 } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import { useFormStatus, useFormState } from "react-dom"
import { deleteCourse } from "./courses.actions"


const initialState = {
    message: "",
    success: false,
    pending: false
}  
  
export default function DeleteCourse({ course }: { course: Database['public']['Tables']['courses']['Row'] }) {
    const [state, formAction] = useFormState(deleteCourse, initialState)
    const { pending } = useFormStatus()
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
                    <AlertDialogTitle>Are you absolutely sure you want to delete <b>{course?.name}</b>?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this course and remove it&#39;s data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction type="submit" className={buttonVariants({
                        variant: "destructive",
                        className: "flex items-center gap-2"
                    })}>{state.pending ? "Deleting..." : "Continue"} {pending && <Loader2 className="animate-spin" />}</AlertDialogAction>
                </AlertDialogFooter>
                <input type="hidden" name="id" value={course?.id!}/>
            </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  