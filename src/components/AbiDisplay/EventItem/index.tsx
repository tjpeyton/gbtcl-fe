'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

type EventItemProps = {
  event: any
}   


const EventItem = ({ event }: EventItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-md overflow-hidden">
      <CollapsibleTrigger asChild>
        <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              event
            </Badge>
            <span className="font-medium">{event.name}</span>
          </div>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="p-3 pt-0 border-t">
        <div className="font-mono text-sm mt-2 p-2 bg-muted rounded-md">
          <div>
            <span className="text-primary">event {event.name}</span>
            <span>(</span>
            {event.inputs?.map((input: any, i: number) => (
              <span key={i}>
                {i > 0 && ', '}
                <span className="text-muted-foreground">{input.type}</span>
                {input.indexed && <span className="text-blue-500">{' indexed'}</span>}
                {input.name && <span> {input.name}</span>}
              </span>
            ))}
            <span>)</span>
          </div>
        </div>

        {event.inputs && event.inputs.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-1">Parameters</h4>
            <div className="space-y-1">
              {event.inputs.map((input: any, index: number) => (
                <div key={index} className="text-sm flex gap-2">
                  <Badge variant="outline" className="font-mono">
                    {input.type}
                  </Badge>
                  {input.indexed && (
                    <Badge variant="secondary">
                      indexed
                    </Badge>
                  )}
                  <span>{input.name || `param${index}`}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {event.anonymous && (
          <div className="mt-3">
            <Badge variant="outline">anonymous</Badge>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  )
}

export default EventItem
