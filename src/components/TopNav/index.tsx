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

  const getWalletInfoProps = (): WalletInfoProps => {
    return {
        address,
        currentChain,
        disconnect,
    }
  }

  return (
    <nav className={styles.container}>
      <h1>Global Bitcoin Lottery</h1>
      <Link 
        className={`${pathname === '/about' ? 'activeLink' : 'link'}`}
        // go nowhere for now
        href='/'>
        About
      </Link>
      <Link 
        className={`${pathname === '/whitepaper' ? 'activeLink' : 'link'}`}
        // go nowhere for now
        href='/'>
        Whitepaper
      </Link>
      {
        isAuthenticated
            ? <WalletInfo {...getWalletInfoProps()} ></WalletInfo>
            : <div className={styles.connectWallet}>
                <Button
                  type='primary'
                  onClick={connectWallet}>
                  Connect Wallet
                </Button>
              </div>
      }
    </nav>
  )
}

export default TopNav
