'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'

import { cn } from '@/lib/utils'

type FunctionItemProps = {
  func: any
}


const FunctionItem = ({ func }: FunctionItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const getStateMutabilityColor = (stateMutability?: string) => {
    switch (stateMutability) {
    case 'view':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
    case 'pure':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
    case 'payable':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
    }
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md overflow-hidden">
      <CollapsibleTrigger asChild>
        <div className='flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50'>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={cn('font-mono', getStateMutabilityColor(func.stateMutability))}>
              {func.stateMutability}
            </Badge>
            <span className="font-medium">{func.name}</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 pt-0 border-t">
        <div className="font-mono text-sm mt-2 p-2 bg-muted rounded-md">
          <div>
            <span className="text-primary">{func.name}</span>
            <span>(</span>
            {func.inputs?.map((input: any, i: number) => (
              <span key={i}>
                {i > 0 && ', '}
                <span className="text-muted-foreground">{input.type}</span>
                {input.name && <span> {input.name}</span>}
              </span>
            ))}
            <span>)</span>
            {func.outputs && func.outputs.length > 0 && (
              <>
                <span>{' returns '}</span>
                <span>(</span>
                {func.outputs.map((output: any, i: number) => (
                  <span key={i}>
                    {i > 0 && ', '}
                    <span className="text-muted-foreground">{output.type}</span>
                    {output.name && <span> {output.name}</span>}
                  </span>
                ))}
                <span>)</span>
              </>
            )}
          </div>
        </div>

        {func.inputs && func.inputs.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-1">Inputs</h4>
            <div className="space-y-1">
              {func.inputs.map((input: any, index: number) => (
                <div key={index} className="text-sm flex gap-2">
                  <Badge variant="outline" className="font-mono">
                    {input.type}
                  </Badge>
                  <span>{input.name || `param${index}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {func.outputs && func.outputs.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-1">Outputs</h4>
            <div className="space-y-1">
              {func.outputs.map((output: any, index: number) => (
                <div key={index} className="text-sm flex gap-2">
                  <Badge variant="outline" className="font-mono">
                    {output.type}
                  </Badge>
                  <span>{output.name || `output${index}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
} 

export default FunctionItem