'use client'

import { useState } from 'react'

import { useSyncProviders } from '@/lib/hooks/useSyncProviders'
import { EIP6963ProviderDetail } from '@/types'

import styles from './connect.module.css'


const ConnectPage = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')
  const providers = useSyncProviders()

  // Connect to the selected provider using eth_requestAccounts.
  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts: any = await providerWithInfo.provider.request({ 
        method: 'eth_requestAccounts'
      })

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <div className='discover-wallet-container'>      
        <h2>Wallets Detected:</h2>    
        {
          providers.length > 0 
            ? providers?.map((provider: EIP6963ProviderDetail) => (
              <button key={provider.info.uuid} onClick={() => handleConnect(provider)}>
                <img src={provider.info.icon} alt={provider.info.name}/>
                <div>{provider.info.name}</div>
              </button>
            )) 
            : <div>No Announced Wallet Providers</div>
        }
        <hr/>
        <h2>{userAccount ? '' : 'No '}Wallet Selected</h2>      
      </div>
    </main>
  )
}

export default ConnectPage