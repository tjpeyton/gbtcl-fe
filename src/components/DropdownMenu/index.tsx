import styles from './DropdownMenu.module.css'

type DropdownMenuProps = {
  children: React.ReactNode
}

const DropdownMenu = (props: DropdownMenuProps) => {
  return (
    <div className={styles.container}>
        <ul className={styles.menu}>
            {props.children}
        </ul>
    </div>
  )
}

export default DropdownMenu
