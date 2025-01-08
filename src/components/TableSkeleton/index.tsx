import { Skeleton } from '@/components/ui/skeleton'

export type TableSkeletonProps = { 
  rows: number
  columns: number
}

const TableSkeleton = ({ rows, columns }: TableSkeletonProps) => {
  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <div className="flex items-center bg-gray-100 p-4 font-semibold w-full">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-5 w-full rounded-md mx-2"
          />
        ))}
      </div>
      <div className="divide-y w-full">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center p-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                className="h-5 w-full rounded-md mx-2"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableSkeleton
