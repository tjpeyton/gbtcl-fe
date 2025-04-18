'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'

import { LotteryDocument, GetAllLotteriesResponse, Lottery, LotteryStatus, ContractAbv } from '@/lib/types/lottery'
import { ContractDocument, GetAllContractsResponse } from '@/lib/types/contract'

import { fetchAllContracts } from '@/app/services/contractService'
import { deleteLottery, fetchAllLotteries, saveLottery } from '@/app/services/lotteryService'

import { DataTable } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/hooks/use-toast'
import { CreateLotteryForm } from '@/components/forms/CreateLotteryForm'
import { CreateLotteryFormData } from '@/components/forms/CreateLotteryForm/types'
import FormDialog from '@/components/dialog/FormDialog'
import TableSkeleton from '@/components/TableSkeleton'
import Header from '@/components/Header'

import { WalletContext, useWalletContext } from '@/app/contexts/WalleContext'
import { useLotteryContract } from '@/app/hooks/useLotteryContract'

import { minutesToSeconds } from '@/lib/utils'

import columns from './columns'


const LotteryPageClient = () =>  {
  const [lotteries, setLotteries] = useState<LotteryDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [contracts, setContracts] = useState<ContractDocument[]>([])
  const [lotteryDialogOpen, setLotteryDialogOpen] = useState(false) 

  const {
    state: { isAuthenticated },
    getBlockTimestamp,
  } = useWalletContext() as WalletContext

  const { getLotteryContract } = useLotteryContract() 

  
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

      fetchLotteries() 

      toast({ 
        title: 'Lottery saved to database successfully',
        description: 'Lottery ID: ' + lottery.lotteryId + ' created at ' + lottery.createdAt,
        variant: 'success' 
      })
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

      const contractInstance = await getLotteryContract(data.contract) 

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
          currency: data.currency,
          // Convert to number to handle BigInt
          lotteryId: Number(lotteryId),
          ticketPrice: Number(ticketPrice),
          maxTickets: Number(maxTickets),
          operatorCommissionPercentage: Number(operatorCommissionPercentage),
          expiration: Number(expiration),
          createdAt: Number(blockTimestamp), 
          status: LotteryStatus.OPEN
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

  const handleDeleteLottery = async (lotteryId: string, contract: ContractAbv) => {
    try { 
      await deleteLottery(contract, lotteryId)

      fetchLotteries()

      toast({
        title: 'Lottery deleted successfully',
        description: 'The lottery has been deleted successfully',
        variant: 'success', 
      })  
    } catch (error: any) {
      toast({
        title: 'Failed to delete lottery',
        description: error.message,
        variant: 'destructive',
      })
    }
  }


  useEffect(() => {
    fetchLotteries()
    fetchContracts()  
  }, [])


  return (
    <>
      <Header
        title='Lotteries'
        dialog={!isLoading && 
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
        }>
      </Header>
      {isLoading && <TableSkeleton rows={5} columns={3} />}
      {!isLoading && (
        <DataTable 
          data={lotteries} 
          columns={columns(handleDeleteLottery)} 
        />
      )}
    </>
  )
}

export default LotteryPageClient  
