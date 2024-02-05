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
import React from "react"
import DeleteButton from "../components/DeleteButton"
import { Scholarship } from "@/supabase/scholarships"



  
export default function DeleteScholarship({scholarship}: {scholarship: Scholarship}) {
   

    return (
      <AlertDialog >
        <AlertDialogTrigger asChild>
          <Button isIconOnly className='bg-transparent'><Trash2 size={15} color='red' /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure you want to delete</AlertDialogTitle>
                    <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this institution and remove it&#39;s data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <DeleteButton />
                </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  