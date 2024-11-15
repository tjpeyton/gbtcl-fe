import { columns } from '@/components/LotteryTable/columns';

import { DataTable } from '@/components/ui/table';
import { Card } from '@/components/ui/card';


export default function Home() {
  
  return (
    <Card>
      <DataTable data={[]} columns={columns} />
    </Card>
  );
}
