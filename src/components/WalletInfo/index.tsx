'use client'

import styles from './WalletInfo.module.css'
import Button from '../Button'
import { formatAddress } from '@/lib/utils'

export type WalletInfoProps = {
    address: string | null,
    currentChain: number | null
}

const WalletInfo = (props: WalletInfoProps) => {
  const address = formatAddress(props.address ?? '')

  return (
    <div className={styles.container}>
      <Button onClick={() => {}}>
        <div className={styles.buttonItems}>
          <img alt='walletAvatar'/>
          <span className={styles.address}>{ address }</span>
        </div>     
      </Button>
    </div>
  )
}

export default WalletInfo
