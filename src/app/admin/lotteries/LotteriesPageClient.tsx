'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { LotteryDocument, GetAllLotteriesResponse, Lottery } from '@/lib/types/lottery'
import { ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'

import { fetchAllContracts } from '@/app/services/contractService'
import { fetchAllLotteries, saveLottery } from '@/app/services/lotteryService'

import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/hooks/use-toast'
import { CreateLotteryForm } from '@/components/forms/CreateLotteryForm'
import { CreateLotteryFormData } from '@/components/forms/CreateLotteryForm/types'
import FormDialog from '@/components/dialog/FormDialog'
import TableSkeleton from '@/components/TableSkeleton'

import { WalletContext, useWalletContext } from '@/context/WalleContext'
import { useContract } from '@/app/hooks/useContract'

import { minutesToSeconds } from '@/lib/utils'

import { columns } from './columns'


export const LotteryPageClient = () =>  {
  const [lotteries, setLotteries] = useState<LotteryDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [contracts, setContracts] = useState<ContractDocument[]>([])
  const [lotteryDialogOpen, setLotteryDialogOpen] = useState(false) 

  const {
    state: { isAuthenticated },
    getBlockTimestamp,
  } = useWalletContext() as WalletContext

  const { getContract } = useContract() 

  
  const fetchLotteries = async () => {
    try {
      const data: GetAllLotteriesResponse = await fetchAllLotteries()
      const lotteries: LotteryDocument[] = data.lotteries

      setLotteries(lotteries || [])
    } catch (error: any) {
      toast({
        title: 'Failed to fetch lotteries',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchContracts = async () => {
    try {
      const data: GetAllContractsResponse = await fetchAllContracts()
      const contracts: ContractDocument[] = data.contracts

      setContracts(contracts || [])
    } catch (error: any) {
      toast({
        title: 'Failed to retrieve contracts',
        description: error.message,
        variant: 'destructive' 
      })
    }
  }

  const createLottery = async (
    lottery: Lottery,
    csrfToken: string
  ) => {
    try { 
      await saveLottery(lottery, csrfToken) 

      toast({ 
        title: 'Lottery saved to database successfully',
        description: 'Lottery ID: ' + lottery.lotteryId + ' created at ' + lottery.createdAt,
        variant: 'success' 
      })
      fetchLotteries() 
    } catch (error: any) {
      toast({ 
        title: 'Failed to save lottery to database',
        description: error.message,
        variant: 'destructive' 
      })
    }
  } 

  const handleCreateLottery = async (data: CreateLotteryFormData, csrfToken: string) => {
    try {
      setIsCreating(true)
      if (!isAuthenticated) throw new Error('User is not authenticated')

      const contractInstance = await getContract(data.contract.address) 

      // Listen for LotteryCreated event
      contractInstance.once('LotteryCreated', (
        ticketPrice: number,
        maxTickets: number,
        operatorCommissionPercentage: number,
        expiration: number,
        lotteryId: number
      ) => {

        const lottery: Lottery = {
          contract: {
            address: data.contract.address,
            chainId: data.contract.chainId
          },
          // Convert to number to handle BigInt
          lotteryId: Number(lotteryId),
          ticketPrice: Number(ticketPrice),
          maxTickets: Number(maxTickets),
          operatorCommissionPercentage: Number(operatorCommissionPercentage),
          expiration: Number(expiration),
          createdAt: Number(blockTimestamp), 
        }
        toast({ 
          title: 'Lottery created successfully',
          description: 'Lottery ID: ' + lottery.lotteryId + ' created at ' + lottery.createdAt,
          variant: 'success' 
        }) 
        setLotteryDialogOpen(false)
        createLottery(lottery, csrfToken)
      })

      // Get current block timestamp
      const blockTimestamp = await getBlockTimestamp()
      if (!blockTimestamp) throw new Error('Block timestamp not found')

      const expiration = blockTimestamp + minutesToSeconds(data.expiration)

      const tx = await contractInstance.createLottery(
        data.ticketPrice, 
        data.maxTickets, 
        data.commissionPercentage,
        expiration,
      )

      await tx.wait()
    } catch (error: any) {
      toast({ 
        title: 'Failed to create lottery',
        description: error.message,
        variant: 'destructive' 
      })
    } finally {
      setIsCreating(false)
    }
  }

  useEffect(() => {
    fetchLotteries()
    fetchContracts()  
  }, [])


  return (
    <div className='container mx-auto py-2'>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-2xl font-bold'>Lotteries</h1>
        {!isLoading && 
          <FormDialog
            title='Create Lottery'
            description='Create a new lottery to a connected smart contract'
            isOpen={lotteryDialogOpen}
            setIsOpen={setLotteryDialogOpen}
            trigger={
              <Button icon={<Plus/>}>
                Create Lottery
              </Button>
            }  
            form={
              <CreateLotteryForm 
                onSubmit={handleCreateLottery}
                isLoading={isCreating}
                contracts={contracts} 
              />
            }
          />  
        }
      </div>
      {isLoading && <TableSkeleton rows={5} columns={3} />}
      {!isLoading && (
        <DataTable 
          data={lotteries} 
          columns={columns} 
        />
      )}
    </div>
  )
}
