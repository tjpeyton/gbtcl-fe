'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import Button from '../Button'
import WalletInfo, { WalletInfoProps } from '../WalletInfo'

import styles from './TopNav.module.css'


const TopNav = () => {
  const pathname = usePathname()
  const router = useRouter()

  const isConnected = (): boolean => {
    const token = localStorage.getItem('token')
    return token ? true : false
  }

  const getWalletInfoProps = (): WalletInfoProps => {
    const address = localStorage.getItem('address')
    const name = localStorage.getItem('name') 
    const rdns = localStorage.getItem('rdns')
    const uuid = localStorage.getItem('uuid')
    const icon = localStorage.getItem('icon')
    return {
        address,
        name,
        rdns,
        uuid,
        icon
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
                    onClick={() => router.push('/connect')}>
                    Connect Wallet
                  </Button>
               </div>
              : <></>
      }
    </nav>
  )
}

export default TopNav
