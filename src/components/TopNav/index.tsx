'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import WalletInfo from '../WalletInfo'

import styles from './TopNav.module.css'


const TopNav = () => {
  const pathname = usePathname()

  return (
    <nav className="flex flex-row justify-center items-center bg-white h-20">
      <Link
        href='/'>
        <h1>Global Bitcoin Lottery</h1>
      </Link>
      <Link 
        className={`
          ${pathname === '/about' 
            ? 'text-orange-500 hover:cursor-pointer' 
            : 'text-black hover:text-orange-500 hover:cursor-pointer'
          }`
        }
        // go nowhere for now
        href='/about'>
        About
      </Link>
      <Link 
        className={`
          ${pathname === '/whitepaper' 
            ? 'text-orange-500 hover:cursor-pointer' 
            : 'text-black hover:text-orange-500 hover:cursor-pointer'
          }`
        }
        // go nowhere for now
        href='/whitepaper'>
        Whitepaper
      </Link>
      <div className="ml-auto">  
        <WalletInfo />
      </div>
    </nav>
  )
}

export default TopNav
