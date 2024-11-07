"use client"

import { useState } from 'react'
import { Plug } from 'lucide-react'

import { toast } from '@/lib/hooks/use-toast'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ConnectContractForm } from '@/components/forms/ConnectContractForm'

import { FormData } from '../../forms/ConnectContractForm/types'

export type ConnectContractDialogProps = {
  onSuccess: () => void
}

export const ConnectContractDialog = ({ onSuccess }: ConnectContractDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: FormData, csrfToken: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/contract', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'X-CSRF-Token': csrfToken
        }
      })
      const json: any = await response.json()
      if (!response.ok) {
        toast({
          title: 'Failed to connect contract',
          description: json.error || json.message,
          variant: 'destructive' 
        })
        return
      } else {
        toast({
          title: 'Contract connected',
          description: 'You can now interact with the contract',
          variant: 'default'
        })
        onSuccess()
      } 

      setOpen(false)
    } catch (error) {
      toast({
        title: 'Failed to connect contract',
        description: 'Please try again',
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <Plug/>
            Connect Contract
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect Contract</DialogTitle>
        </DialogHeader>
        <ConnectContractForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
