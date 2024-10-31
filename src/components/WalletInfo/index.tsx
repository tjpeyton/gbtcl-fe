'use client'

import { LogOut } from 'lucide-react'

import { CHAIN_ID_TO_NETWORK, formatAddress } from '@/lib/utils'
import { useWalletContext, WalletContext } from '@/context/WalleContext'

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'


const WalletInfo = () => {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWalletContext() as WalletContext;

  return (
    <>
      {isAuthenticated 
        ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button 
                  type='button'>
                  { formatAddress(address ?? '') }
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {CHAIN_ID_TO_NETWORK[currentChain ?? 0]}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut/>
                  <Button 
                    type='button'
                    variant='ghost'
                    onClick={disconnect}>
                    Disconnect
                  </Button>
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
