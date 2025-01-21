'use client'

import { useCallback, useEffect, useState } from 'react'
import { BrowserProvider, ethers, JsonRpcSigner } from 'ethers'

import { authenticateWallet } from '@/app/services/authService'

declare global {
    interface Window {
      ethereum?: any;
    }
}

export type WalletState = {
    address: string | null
    currentChain: number | null
    signer: JsonRpcSigner | null
    provider: BrowserProvider | null
    isAuthenticated: boolean
    isAdmin: boolean
    adminToken: string | null
}


const useWalletProvider = () => {
  const initialWalletState: WalletState = {
    address: null,
    currentChain: null,
    signer: null,
    provider: null,
    isAuthenticated: false,
    isAdmin: false,
    adminToken: null
  }
  
  const [state, setState] = useState<WalletState>(initialWalletState)
  
  const connectWallet = useCallback(async () => {
    if (state.isAuthenticated) return
  
    try {
      const { ethereum } = window

      const provider = new ethers.BrowserProvider(ethereum)
  
      const accounts: string[] = await provider.send('eth_requestAccounts', [])
  
      if (accounts.length > 0) {
        const signer = await provider.getSigner()
        const chain = Number(await (await provider.getNetwork()).chainId)

        const auth = await authenticateWallet(accounts[0])

        setState({
          ...state,
          address: accounts[0],
          signer,
          currentChain: chain,
          provider,
          isAuthenticated: true,
          isAdmin: auth.isAdmin,
          adminToken: auth.token
        })
      }
    } catch (error) {
      console.error('Error connecting wallet', error)
    }
  }, [state])

  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (error: any) {
      // Error code 4902 means the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        console.error('This network needs to be added to your wallet first')
      }
      throw error
    }
  }, [])

  const getBlockTimestamp = useCallback(async () => {
    if (!state.provider) throw new Error('Provider not initialized')

    const block = await state.provider.getBlock('latest')

    return block?.timestamp
  }, [state.provider])
  
  const disconnect = () => {
    setState(initialWalletState)
    localStorage.removeItem('isConnected')
    localStorage.removeItem('token')
    localStorage.removeItem('isAdmin')  
  }
  
  // Check if wallet is connected
  useEffect(() => {
    if (window == null) return
  
    if (localStorage.hasOwnProperty('isConnected')) {
      connectWallet()
    }
  }, [connectWallet, state.isAuthenticated])
  
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return
  
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      setState({ ...state, address: accounts[0] })
    })
  
    window.ethereum.on('chainChanged', (chainId: string) => {
      setState({ ...state, currentChain: Number(chainId) })
    })
  
    return () => {
      window.ethereum.removeAllListeners()
    }
  }, [state])
  
  return {
    connectWallet,
    disconnect,
    switchNetwork, 
    getBlockTimestamp,
    state,
  }
}

export default useWalletProvider
  