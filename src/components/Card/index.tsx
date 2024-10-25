import styles from './Card.module.css';

export type CardProps = {
    children: React.ReactNode,
    title?: string,
}

export const Card = (props: CardProps) => {
    return <div className={styles.card}>
        {props.title && <h2>{props.title}</h2>}
        {props.children}
    </div>
}

export default Card;
