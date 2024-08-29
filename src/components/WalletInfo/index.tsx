import { useState } from 'react'

import styles from './WalletInfo.module.css'
import Button from '../Button'
import { formatAddress } from '@/lib/utils'

export type WalletInfoProps = {
    address: string | null,
    name: string | null,
    rdns: string | null,
    uuid: string | null,
    icon: string | null
}

const WalletInfo = (props: WalletInfoProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Button onClick={() => setOpen(!open)}>
        <img src={props.icon ?? ''} alt='walletAvatar'/>
        <span className={styles.address}>{ formatAddress(props.address ?? '') }</span>
      </Button>
      {
        open
          ? <>
            <div>Name: {props.name}</div>
            <div>RDNS: {props.rdns}</div>
            <div>UUID: {props.uuid}</div>
          </>
          : <></>
      }
    </div>
  )
}

export default WalletInfo
