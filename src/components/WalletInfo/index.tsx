'use client'

import { useState } from 'react'

import { CHAIN_ID_TO_NETWORK, formatAddress } from '@/lib/utils'
import { useWalletContext, WalletContext } from '@/context/WalleContext'

import Button, { ButtonType, ButtonVariant } from '../Button'
import DropdownMenu from '../DropdownMenu'

import styles from './WalletInfo.module.css'


const WalletInfo = () => {
  const {
    connectWallet,
    disconnect,
    state: { isAuthenticated, address, currentChain },
  } = useWalletContext() as WalletContext;
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {isAuthenticated 
        ? (
          <>
            <div className={styles.connectWalletContainer}>
              <Button 
                type={ButtonType.BUTTON}
                variant={ButtonVariant.PRIMARY}
                onClick={() => setIsOpen(!isOpen)}>
                <div className={styles.buttonItems}>
                  <span className={styles.address}>{ formatAddress(address ?? '') }</span>
                </div>     
              </Button>
            </div>
            {
              isOpen && (
                <DropdownMenu>
                  <li>
                    <span>{CHAIN_ID_TO_NETWORK[currentChain ?? 0]}</span>
                  </li>
                  <li>
                    <Button 
                      type={ButtonType.BUTTON}
                      variant={ButtonVariant.TERTIARY}
                      onClick={disconnect}>
                      Disconnect
                    </Button>
                  </li>
                </DropdownMenu>
              )
            }
          </>
        ) 
        : (
          <div className={styles.connectWalletContainer}>
            <Button
              type={ButtonType.BUTTON}
              variant={ButtonVariant.SECONDARY}
              onClick={connectWallet}>
              Connect Wallet
            </Button>
          </div>
        )
      }
    </div>
  )
}

export default WalletInfo
