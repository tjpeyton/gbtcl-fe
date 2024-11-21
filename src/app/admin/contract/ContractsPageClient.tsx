'use client'

import { useEffect, useState } from 'react'

import { toast } from '@/app/hooks/use-toast'

import { DataTable } from "@/components/ui/table"
import { ConnectContractDialog } from '@/components/dialog/ConnectContractDialog'

import { Contract, columns } from "./columns"


export const ContractsPageClient = () => {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    fetchContracts()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-2">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Contracts</h1>
        <ConnectContractDialog onSuccess={() => {
          fetchContracts()
        }} />
      </div>
      <DataTable 
        data={contracts} 
        columns={columns} 
      />
    </div>
  )
}
