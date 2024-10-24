'use client'

import { useState } from 'react'

import styles from './WalletInfo.module.css'

import Button from '../Button'

import { CHAIN_ID_TO_NETWORK, formatAddress } from '@/lib/utils'


export type WalletInfoProps = {
    address: string | null,
    currentChain: number | null,
    disconnect: () => void
}

const WalletInfo = (props: WalletInfoProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const address = formatAddress(props.address ?? '')

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.buttonItems}>
          <span className={styles.address}>{ address }</span>
        </div>     
      </Button>
      {
        isOpen && (
          <ul className={styles.dropdownMenu}>
            <li className={styles.dropdownItem}>
              <span>{CHAIN_ID_TO_NETWORK[props.currentChain ?? 0]}</span>
            </li>
            <li>
              <Button onClick={props.disconnect}>Disconnect</Button>
            </li>
          </ul>
        )
      }
      </div>
    </div>
  )
}

export default WalletInfo
