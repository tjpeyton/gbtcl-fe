'use client'

import { useState } from 'react'

import { useSyncProviders } from '@/lib/hooks/useSyncProviders'
import { EIP6963ProviderDetail } from '@/types'

import styles from './connect.module.css'
import Button from '@/components/Button'


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
    <main className={styles.container}>      
      <h2 className={styles.title}>Connect Wallet:</h2>   
      <div className={styles.walletContainer}>
        {
          providers.length > 0 
            ? providers?.map((provider: EIP6963ProviderDetail) => (
              <div className={styles.item} key={provider.info.uuid}>
                <Button onClick={() => handleConnect(provider)}>
                  <img src={provider.info.icon} alt={provider.info.name}/>
                  <div>{provider.info.name}</div>
                </Button>
              </div>
            )) 
            : <div>No Announced Wallet Providers</div>
        } 
      </div> 
    </main>
  )
}

export default ConnectPage