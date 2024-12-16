"use client"

import { useState } from 'react'
import { Plug } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from '@/components/ui/hooks/use-toast'

import { ConnectContractForm } from '@/components/forms/ConnectContractForm'
import { ConnectContractFormData } from '@/components/forms/ConnectContractForm/types'

import { saveContract } from '@/app/services/contractService'

export type ConnectContractDialogProps = {
  onSuccess: () => void
}

export const ConnectContractDialog = ({ onSuccess }: ConnectContractDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (data: ConnectContractFormData, csrfToken: string) => {
    try {
      setIsLoading(true)
      const response = await saveContract(data, csrfToken)
      if (!response.ok) {
        const data = await response.json()
        toast({
          title: 'Failed to connect contract',
          description: data.error || data.message,
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
