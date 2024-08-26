'use client'

import styles from './Button.module.css'

type ButtonProps = {
    children: React.ReactNode,
    onClick: () => void,
    type: string
}

const Button = (props: ButtonProps) => {

  return (
    <button
      onClick={props.onClick}
      className={props.type === 'primary' ? styles.primary : styles.secondary}
    >
      {props.children}
    </button>
  )
}

export default Button
