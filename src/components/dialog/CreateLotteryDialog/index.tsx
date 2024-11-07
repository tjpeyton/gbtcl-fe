"use client"

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { FormData } from '../../forms/ConnectContractForm/types'
import { CreateLotteryForm } from '@/components/forms/CreateLotteryForm'
import { Contract } from '@/app/admin/contract/columns'
import { toast } from '@/lib/hooks/use-toast'

export type CreateLotteryDialogProps = {
  onSuccess: () => void
}

export const CreateLotteryDialog = ({ onSuccess }: CreateLotteryDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (data: FormData, csrfToken: string) => {
    try {
      setIsLoading(true)

      setOpen(false)
    } catch (error) {

    } finally {
      setIsLoading(false)
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Lottery</DialogTitle>
        </DialogHeader>
        <CreateLotteryForm 
          onSubmit={handleSubmit}
          isLoading={isLoading}
          contracts={contracts} 
        />
      </DialogContent>
    </Dialog>
  )
}
