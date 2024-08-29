'use client'

import { useSyncProviders } from '@/lib/hooks/useSyncProviders'
import { EIP6963ProviderDetail } from '@/types'

import styles from './connect.module.css'
import Button from '@/components/Button'
import { useRouter } from 'next/navigation'


const ConnectPage = () => {
  const providers = useSyncProviders()
  const router = useRouter()

  // Connect to the selected provider using eth_requestAccounts.
  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts: any = await providerWithInfo.provider.request({ 
        method: 'eth_requestAccounts'
      })

      // Generate auth token on succesfull wallet integration
      if (accounts[0]) {
        const response = await fetch('/api/auth', {
          method: 'POST',
          body: JSON.stringify({address: accounts[0]})
        })
        const body = await response.json()
        localStorage.setItem('token', body.token)

        const info = providerWithInfo.info
        localStorage.setItem('name', info.name)
        localStorage.setItem('rdns', info.rdns)
        localStorage.setItem('uuid', info.uuid)
        localStorage.setItem('icon', info.icon)

        router.push('/')
      }
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
