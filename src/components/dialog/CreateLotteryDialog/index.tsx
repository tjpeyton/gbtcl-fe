"use client"

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { CreateLotteryForm } from '@/components/forms/CreateLotteryForm'
import { CreateLotteryFormData } from '@/components/forms/CreateLotteryForm/types'

import { Contract } from '@/app/admin/contract/columns'

import { toast } from '@/app/hooks/use-toast'


export type CreateLotteryDialogProps = {
  onSuccess: () => void,
  onSubmit: (data: CreateLotteryFormData, csrfToken: string) => Promise<void>,
  isLoading: boolean
}

export const CreateLotteryDialog = (props: CreateLotteryDialogProps) => {
  const [open, setOpen] = useState(false)
  const [contracts, setContracts] = useState<Contract[]>([])

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/contract')
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setContracts(data.contracts || [])    
    } catch (error) {
      toast({
        title: 'Failed to retrieve contracts',
        variant: 'destructive' 
      })
    }
  }

  useEffect(() => {
    fetchContracts()
  }, [])    


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
            <Plus/>
            Create Lottery
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Create Lottery</DialogTitle>
        </DialogHeader>
        <CreateLotteryForm 
          onSubmit={async (...args) => {
            await props.onSubmit(...args)
            setOpen(false)
            props.onSuccess()
          }}
          isLoading={props.isLoading}
          contracts={contracts} 
        />
      </DialogContent>
    </Dialog>
  )
}
