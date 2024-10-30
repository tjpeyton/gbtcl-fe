import Card from '@/components/Card';

import styles from './page.module.css';
import { columns } from '@/components/LotteryTable/columns';
import { DataTable } from '@/components/ui/table';

export default function Home() {
  return (
      <main className={styles.main}>
        <Card>
          <DataTable data={[]} columns={columns} />
        </Card>
      </main>
  );
}
