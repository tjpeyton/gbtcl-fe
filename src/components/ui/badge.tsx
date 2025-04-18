import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground',
        outline:
          'border border-border bg-background text-foreground',  
        open:
          'border-transparent bg-open text-open-foreground',
        drawing:
          'border-transparent bg-drawing text-drawing-foreground',
        winnerSelected:
          'border-transparent bg-winnerSelected text-winnerSelected-foreground',
        ETH:
          'border-transparent bg-eth text-eth-foreground',
        USDT:
          'border-transparent bg-usdt text-usdt-foreground',
        USDC:
          'border-transparent bg-usdc text-usdc-foreground',
        SepoliaETH:
          'border-transparent bg-sepoliaETH text-sepoliaETH-foreground',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground',
        completed:
          'border-transparent bg-completed text-completed-foreground',
        cancelled:
          'border-transparent bg-cancelled text-cancelled-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
