'use client'

import Link from 'next/link'
import { LogOut, Settings } from 'lucide-react'

import { Button } from '../ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../ui/dropdown-menu'

import { CHAIN_ID_TO_NETWORK, formatAddress } from '@/lib/utils'
import { useWalletContext, WalletContext } from '@/app/contexts/WalleContext'


const WalletInfo = () => {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain, isAdmin },
  } = useWalletContext() as WalletContext

  return (
    <>
      {isAuthenticated 
        ? (
          <DropdownMenu>
            <DropdownMenuTrigger className='flex flex-row items-center'>
              <p className='font-bold bg-black text-white px-4 py-2 rounded-md'>
                { formatAddress(address ?? '') }
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-48'>
              <DropdownMenuLabel>
                {CHAIN_ID_TO_NETWORK[currentChain ?? 0]}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {isAdmin && (
                <DropdownMenuItem>
                  <div className='flex w-full'> 
                    <Link 
                      href='/admin/lotteries' 
                      className='flex gap-2 items-center cursor-pointer w-full'>
                      <Settings/>
                      Admin
                    </Link>
                  </div>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={disconnect}>
                <div className='flex gap-2 items-center cursor-pointer w-full'>
                  <LogOut/>
                  <p>Disconnect</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> 
        ) 
        : (
          <Button
            type='button'
            variant='secondary'
            onClick={connectWallet}>
              Connect Wallet
          </Button>
        )
      }
    </>
  )
}

export default WalletInfo
