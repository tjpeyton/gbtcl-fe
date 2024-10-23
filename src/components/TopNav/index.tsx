'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Button from '../Button'
import WalletInfo, { WalletInfoProps } from '../WalletInfo'

import styles from './TopNav.module.css'
import { useWalletContext, WalletContext } from '@/context/WalleContext'


const TopNav = () => {
  const pathname = usePathname()
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWalletContext() as WalletContext;

  const isConnected = (): boolean => {
    return isAuthenticated ? true : false
  }

  const getWalletInfoProps = (): WalletInfoProps => {
    console.log('address: ', address)
    console.log('currentChain: ', currentChain)
    // const address = localStorage.getItem('token')
    // const name = localStorage.getItem('name') 
    // const rdns = localStorage.getItem('rdns')
    // const uuid = localStorage.getItem('uuid')
    // const icon = localStorage.getItem('icon')

    return {
        address,
        currentChain,
    }
  }

  return (
    <nav className={styles.container}>
      <h1>Global Bitcoin Lottery</h1>
      <Link 
        className={`${pathname === '/about' ? 'activeLink' : 'link'}`}
        href='/about'>
        About
      </Link>
      <Link 
        className={`${pathname === '/whitepaper' ? 'activeLink' : 'link'}`}
        href='/whitepaper'>
        Whitepaper
      </Link>
      {
        isConnected()
            ? <WalletInfo {...getWalletInfoProps()} ></WalletInfo>
            : pathname !== '/connect'
              ? <div className={styles.connectWallet}>
                  <Button
                    type='primary'
                    onClick={connectWallet}>
                    Connect Wallet
                  </Button>
               </div>
              : <></>
      }
    </nav>
  )
}

export default TopNav
