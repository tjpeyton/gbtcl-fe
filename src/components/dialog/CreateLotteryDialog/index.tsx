"use client"

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/hooks/use-toast'

import { CreateLotteryForm } from '@/components/forms/CreateLotteryForm'
import { CreateLotteryFormData } from '@/components/forms/CreateLotteryForm/types'

import { fetchAllContracts } from '@/app/services/contractService'

import { Contract, ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'


export type CreateLotteryDialogProps = {
  onSuccess: () => void,
  onSubmit: (data: CreateLotteryFormData, csrfToken: string) => Promise<void>,
  isLoading: boolean,
  contracts: ContractDocument[]
}

export const CreateLotteryDialog = (props: CreateLotteryDialogProps) => {
  const [open, setOpen] = useState(false)

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
          contracts={props.contracts} 
        />
      </DialogContent>
    </Dialog>
  )
}
