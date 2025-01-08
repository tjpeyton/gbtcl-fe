'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import WalletInfo from '../WalletInfo'


const TopNav = () => {
  const pathname = usePathname()

  return (
    <nav className='flex flex-row items-center bg-white h-20 px-20'>
      <div className="flex flex-row items-center gap-10 flex-1">
        <Link
          href='/'>
          <h1 className="text-2xl font-bold">Global Bitcoin Lottery</h1>
        </Link>
        <Link 
          className={`${pathname === '/about' 
            ? 'text-orange-500 hover:cursor-pointer' 
            : 'text-black hover:text-orange-500 hover:cursor-pointer'}`
          }
          href='/about'>
          About
        </Link>
        <Link 
          className={`${pathname === '/whitepaper' 
            ? 'text-orange-500 hover:cursor-pointer' 
            : 'text-black hover:text-orange-500 hover:cursor-pointer'}`
          }
          href='/whitepaper'>
          Whitepaper
        </Link>
      </div>
      <div className='ml-8'>  
        <WalletInfo />
      </div>
    </nav>
  )
}

export default TopNav
