'use client'

import styles from './Button.module.css'


export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum ButtonType {
  BUTTON = 'button',
  SUBMIT = 'submit',
  RESET = 'reset',
}

type ButtonProps = {
    children: React.ReactNode,
    onClick: () => void,
    variant?: ButtonVariant,
    type?: ButtonType,
    className?: string,
    id?: string,
}

const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type ? props.type : 'button'}
      onClick={props.onClick}
      className={ `${styles.button}
        ${props.variant === 'primary' 
          ? styles.primary 
          : props.variant === 'secondary' 
            ? styles.secondary 
            : props.variant === 'tertiary'
              ? styles.tertiary
              : ''
        }`
      }
    >
      {props.children}
    </button>
  )
}

export default Button
