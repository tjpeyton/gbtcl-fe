import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { ContractDocument } from '@/lib/types/contract'
import { CHAIN_ID_TO_NETWORK } from '@/lib/utils'
import { ContractAddress } from '../ContractAdress'


type ContractDetailsCardProps = {
  contract: ContractDocument
}


const ContractDetailsCard = ({ contract }: ContractDetailsCardProps) => {
  return (
    <Card className='md:col-span-2'>
      <CardHeader>
        <CardTitle>
          <span>Contract Details</span>
        </CardTitle>
        <CardDescription>
          Created {new Date(contract.createdAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className="rounded-lg border p-4">
          <ContractAddress address={contract.address} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Network</div>
            <div className="text-lg font-semibold">
              {contract ? CHAIN_ID_TO_NETWORK[contract.chainId] : <Skeleton className="h-6 w-24" />}
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="mb-2 text-sm font-medium text-muted-foreground">ABI</div>
          
        </div>
      </CardContent>
    </Card>
  )
}

export default ContractDetailsCard
