import { useState } from 'react'

import styles from './WalletInfo.module.css'
import Button from '../Button'

type WalletInfoProps = {
    addressAbv: string,
    addressLong: string,
    name: string,
    rdns: string,
    uuid: string,
    icon: string
}

const WalletInfo = (props: WalletInfoProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <Button onClick={() => setOpen(!open)}>
        <img src={props.icon} alt='walletAvatar'/>
        <span className={styles.address}>{props.addressAbv}</span>
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
