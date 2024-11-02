import { columns } from '@/components/LotteryTable/columns';
import { DataTable } from '@/components/ui/table';
import { Card } from '@/components/ui/card';

import styles from './page.module.css';

export default function Home() {
  
  return (
      <main className={styles.main}>
        <Card>
          <DataTable data={[]} columns={columns} />
        </Card>
      </main>
  );
}
