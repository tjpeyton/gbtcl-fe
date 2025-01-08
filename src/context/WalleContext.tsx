'use client'

import { createContext, ReactNode, useContext } from 'react'

import useWalletProvider, { WalletState } from '@/app/hooks/useWalletProviders'


export interface WalletContext {
    connectWallet: () => Promise<any>
    disconnect: () => void
    switchNetwork: (chainId: number) => Promise<any>
    getBlockTimestamp: () => Promise<number | undefined>
    state: WalletState
}

type WalletContextProviderProps = {
  children: ReactNode
}
  
const WalletContext = createContext<WalletContext | null>(null)
  

const WalletContextProvider = ({ children }: WalletContextProviderProps) => {
  const { 
    connectWallet, 
    disconnect, 
    switchNetwork, 
    getBlockTimestamp, 
    state 
  } = useWalletProvider()

  return (
    <WalletContext.Provider
      value={{
        connectWallet,
        disconnect,
        switchNetwork,
        getBlockTimestamp,
        state,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider

export const useWalletContext = () => useContext(WalletContext)
