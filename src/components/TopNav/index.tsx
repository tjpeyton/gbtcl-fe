'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import WalletInfo from '../WalletInfo'

import styles from './TopNav.module.css'


const TopNav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.container}>
      <Link
        href='/'>
        <h1>Global Bitcoin Lottery</h1>
      </Link>
      <Link 
        className={`${pathname === '/about' ? 'activeLink' : 'link'}`}
        // go nowhere for now
        href='/about'>
        About
      </Link>
      <Link 
        className={`${pathname === '/whitepaper' ? 'activeLink' : 'link'}`}
        // go nowhere for now
        href='/whitepaper'>
        Whitepaper
      </Link>
      <WalletInfo />
    </nav>
  )
}

export default TopNav
