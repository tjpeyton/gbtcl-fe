import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type ConstructorItemProps = {
  constructor: any
}


const ConstructorItem = ({ constructor }: ConstructorItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md overflow-hidden">
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
              constructor
            </Badge>
            <span className="font-medium">Constructor</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 pt-0 border-t">
        <div className="font-mono text-sm mt-2 p-2 bg-muted rounded-md">
          <div>
            <span className="text-primary">constructor</span>
            <span>(</span>
            {constructor.inputs?.map((input: any, i: number) => (
              <span key={i}>
                {i > 0 && ', '}
                <span className="text-muted-foreground">{input.type}</span>
                {input.name && <span> {input.name}</span>}
              </span>
            ))}
            <span>)</span>
            {constructor.stateMutability && constructor.stateMutability !== 'nonpayable' && (
              <span className="text-blue-500"> {constructor.stateMutability}</span>
            )}
          </div>
        </div>

        {constructor.inputs && constructor.inputs.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-1">Parameters</h4>
            <div className="space-y-1">
              {constructor.inputs.map((input: any, index: number) => (
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
      </CollapsibleContent>
    </Collapsible>
  )
}

export default ConstructorItem
