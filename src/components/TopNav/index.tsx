'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import styles from './TopNav.module.css'

import Button from '../Button'
import Link from 'next/link'


const TopNav = () => {
  const pathname = usePathname()
  const router = useRouter()

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
        pathname !== '/connect'
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
