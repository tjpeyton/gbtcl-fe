'use client'

import { useEffect, useState } from 'react'
import { ConnectContractDialog } from "@/components/ConnectContractDialog"
import { DataTable } from "@/components/ui/table"
import { Contract, columns } from "./columns"
import { toast } from '@/lib/hooks/use-toast'

export function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/contract')
      if (!response.ok) throw new Error('Failed to fetch')
      
      const data = await response.json()
      setContracts(data.contracts || [])
    } catch (error) {
      console.error(error)
      toast({
        title: 'Failed to connect contract',
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
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Contracts</h1>
        <ConnectContractDialog onSuccess={() => {
          // Refresh contracts after new one is added
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
