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
import { Trash, Trash2 } from "lucide-react"
import React from "react"
import { toast } from "sonner"
import { useFormStatus, useFormState } from "react-dom"
import { Article } from "@/supabase/articles"
import DeleteButton from "@/app/dashboard/components/DeleteButton"
import { useRouter } from "next/navigation"
import { deleteArticle } from "./articles.actions"


const initialState = {
    message: "",
    success: false,
    pending: false
}  
  
export default function DeleteArticle({ article }: { article: Article }) {
    const [state, formAction] = useFormState(deleteArticle, initialState)
    const { pending } = useFormStatus()
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
                    <AlertDialogTitle>Are you absolutely sure you want to delete <b>#{article?.title}</b>?</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this Article and remove it&#39;s data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <DeleteButton />
                </AlertDialogFooter>
                <input type="hidden" name="id" value={article?.id!}/>
            </form>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  