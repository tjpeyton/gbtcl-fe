'use client'

import { useState } from 'react'

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export type ConfirmDialogProps = {
  title: string,
  message: string,
  trigger: React.ReactNode,
  onConfirm: () => void,
  confirmText?: string,
  cancelText?: string
}


const ConfirmDialog = (props: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        asChild
        onClick={(e) => {
          e.preventDefault()  
          setIsOpen(true)
        }}
      >
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.message}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-end gap-2">
          <Button 
            variant="outline" 
            onClick={() => { setIsOpen(false)}}
          >{props.cancelText || 'Cancel'}</Button>
          <Button 
            onClick={() => {
              props.onConfirm()
              setIsOpen(false)
            }}
            className="bg-red-500 hover:bg-red-600"
          >{props.confirmText || 'Confirm'}</Button>
        </div>
      </DialogContent>
    </Dialog> 
  )
}

export default ConfirmDialog
