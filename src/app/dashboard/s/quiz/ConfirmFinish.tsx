import React, { useState } from 'react'

import { CheckCheck, Download, MoveLeft, XIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@nextui-org/button'

const ConfirmFinish = ({
    confirmFinish,
    setConfirmFinish,
    open,
    setOpen, checkAnswers
}: {
    confirmFinish: boolean,
    open: boolean,
    setConfirmFinish: React.Dispatch<React.SetStateAction<boolean>>,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    checkAnswers: () => void
}) => {

    function handleConfirmFinish() {
        // setConfirmFinish(true)

        // if (confirmFinish) {
            setOpen(false)
            checkAnswers()
        // } else setOpen(true)
    }

    
  return (
    <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[425px] min-w-300 md:min-w-[700px] p-4">
            <div className="flex flex-col gap-4 py-4 w-full">
                <h2 className='text-muted-foreground text-2xl py-2'>Are you really sure you want to submit this quiz? Have you revised it?!</h2>
            </div>
            <DialogFooter className='flex gap-2 mb-2 max-sm:flex-col-reverse'>
            <Button
                startContent={<CheckCheck size={15} />}
                variant='flat'
                color='success'
                className='w-full'
                onClick={handleConfirmFinish}
                >
                Submit
            </Button>
            <Button startContent={<MoveLeft size={15} />} 
              variant='flat' 
              color='default' className='w-full' onClick={() => setOpen(false)}>
                Return
            </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default ConfirmFinish