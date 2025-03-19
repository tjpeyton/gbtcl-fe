import { Badge } from '@/components/ui/badge'

type OtherItemProps = {
  item: any
}

const OtherItem = ({ item }: OtherItemProps) => {
  return (
    <div className="border rounded-md p-3">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
          {item.type}
        </Badge>
        <span className="font-medium capitalize">{item.type} Function</span>
      </div>

      <div className="font-mono text-sm mt-2 p-2 bg-muted rounded-md">
        <div>
          <span className="text-primary">{item.type}</span>
          {item.stateMutability && <span className="text-blue-500"> {item.stateMutability}</span>}
        </div>
      </div>
    </div>
  )
}

export default OtherItem
