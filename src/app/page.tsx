import Card from '@/components/Card';

import styles from './page.module.css';

export default function Home() {
  return (
      <main className={styles.main}>
        <Card>
          <h1>Card</h1>
        </Card>
      </main>
  );
}
