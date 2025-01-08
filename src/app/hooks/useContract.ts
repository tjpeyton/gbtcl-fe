'use client'    

import { ethers } from 'ethers'

import { fetchContract } from '../services/contractService'

import { useWalletContext, WalletContext } from '@/context/WalleContext'


export const useContract = () => {
  const {
    state: { signer, provider },
    switchNetwork,
  } = useWalletContext() as WalletContext

  const getContract = async (address: string) => {
    try {
      const contractData = await fetchContract(address)   

      // Check if the current network is the same as the contract's network   
      const chain = await provider?.getNetwork()
      const currentChainId = Number(chain?.chainId)  
      if (currentChainId !== Number(contractData.chainId)) {
        await switchNetwork(Number(contractData.chainId))
      }

      if (!signer) throw new Error('Signer not found')
                
      const contract = new ethers.Contract(address, contractData.abi, signer)

      return contract
    } catch (error: any) {
      throw new Error('Failed to initialize contract')
    }
  }

  return { getContract }
}
