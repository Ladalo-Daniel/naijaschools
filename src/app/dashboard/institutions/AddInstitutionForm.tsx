'use client'

import * as React from "react"

import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusIcon } from "lucide-react"
import { SaveButton } from "./SaveInstitutionButton"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import UpsertInstitution from "./institution.actions"
import { Textarea } from "@/components/ui/textarea"
import { Institution } from "@/supabase/institutions"

export default function AddInstitutionForm() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline"><PlusIcon /> Add Institution</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Institution</DialogTitle>
            <DialogDescription>
              Add Institution and Click save when {"you're"} done.
            </DialogDescription>
          </DialogHeader>
          <InstitutionForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline"><PlusIcon /> Add Institution</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Institution</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when {"you're"} done.
          </DrawerDescription>
        </DrawerHeader>
        <InstitutionForm className="px-4" setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const initialState = {
    message: "",
    success: false
}  

export function InstitutionForm({ className, setOpen, institution, toggleOpen }: { 
    className?: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
    institution?: Institution,
    toggleOpen?: (id: number) => void 
  }) {
  const [state, formAction] = useFormState(UpsertInstitution, initialState)

  React.useEffect(() => {
    if (state?.message && state?.success) {
      toast.success(state?.message)
      setOpen(false)
      toggleOpen?.(institution?.id as number)
    } else if (state?.message && !state?.success) {
     toast.error(state?.message)
    }
  }, [state])

  return (
    <form className={cn("grid items-start gap-4", className)} action={formAction}>
      <div className="grid gap-2">
        <Label htmlFor="name">Institution Name</Label>
        <Input type="name" id="name" name="name" placeholder="National Open University of Nigeria." defaultValue={institution?.name || ""} required />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={institution?.description || ""} placeholder="description..." required/>
      </div>
      <input type="hidden" name="upsert_id" value={institution?.id || undefined} />
      <SaveButton />
    </form>
  )
}

