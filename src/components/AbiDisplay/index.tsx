'use client'

import { useState } from 'react'
import { Code, FileJson, ActivityIcon as Function, Info } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import ContractAddress from '@/components/ContractAdress'
import FunctionItem from './FunctionItem'
import EventItem from './EventItem'
import OtherItem from './OtherItem'
import ConstructorItem from './ConstructorItem'

import { ContractDocument, AbiFunction, AbiEvent, AbiConstructor, AbiFallback, AbiReceive } from '@/lib/types/contract'

type AbiDisplayProps = {
  contract: ContractDocument  
}


const AbiDisplay = ({ contract }: AbiDisplayProps) => {
  const [jsonView, setJsonView] = useState(false)

  const functions: AbiFunction[] = contract.abi.filter((item: any) => item.type === 'function') as AbiFunction[]
  const events: AbiEvent[] = contract.abi.filter((item: any) => item.type === 'event') as AbiEvent[]
  const constructor: AbiConstructor[] = contract.abi.filter((item: any) => item.type === 'constructor') as AbiConstructor[]
  const fallback: AbiFallback[] = contract.abi.filter((item: any) => item.type === 'fallback') as AbiFallback[]
  const receive: AbiReceive[] = contract.abi.filter((item: any) => item.type === 'receive') as AbiReceive[]  

  const viewFunctions: AbiFunction[] = functions.filter((item: AbiFunction) => item.stateMutability === 'view')
  const pureFunctions: AbiFunction[] = functions.filter((item: AbiFunction) => item.stateMutability === 'pure')
  const nonpayableFunctions: AbiFunction[] = functions.filter((item: AbiFunction) => item.stateMutability === 'nonpayable')
  const payableFunctions: AbiFunction[] = functions.filter((item: AbiFunction) => item.stateMutability === 'payable')


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{contract.name ?? '-'}</CardTitle>
            <CardDescription className="mt-1">
              <ContractAddress address={contract.address} />
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJsonView(!jsonView)}
            className="flex items-center gap-1"
          >
            {jsonView ? <Function className='h-4 w-4' /> : <FileJson className='h-4 w-4' />}
            {jsonView ? 'Interface View' : 'JSON View'}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant='outline' className='flex items-center gap-1'>
            <Function className='h-3 w-3' />
            {functions.length} Functions
          </Badge>
          <Badge variant='outline' className='flex items-center gap-1'>
            <Code className='h-3 w-3' />
            {events.length} Events
          </Badge>
          {constructor.length > 0 && (
            <Badge variant='outline' className='flex items-center gap-1'>
              <Info className='h-3 w-3' />
              Constructor
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {jsonView ? (
          <ScrollArea className="h-[500px] rounded-md border p-4">
            <pre className="text-sm font-mono">{JSON.stringify(contract.abi, null, 2)}</pre>
          </ScrollArea>
        ) : (
          <Tabs defaultValue="functions">
            <TabsList className='mb-4'>
              <TabsTrigger value="functions">Functions ({functions.length})</TabsTrigger>
              <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
              {constructor.length > 0 && <TabsTrigger value="constructor">Constructor</TabsTrigger>}
              {(fallback.length > 0 || receive.length > 0) && <TabsTrigger value="other">Other</TabsTrigger>}
            </TabsList>

            <TabsContent value="functions" className='space-y-4'>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  View: {viewFunctions.length}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  Pure: {pureFunctions.length}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  Nonpayable: {nonpayableFunctions.length}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  Payable: {payableFunctions.length}
                </Badge>     
              </div>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {functions.map((func: any, index: number) => (
                    <FunctionItem key={index} func={func} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {events.map((event: any, index: number) => (
                    <EventItem key={index} event={event} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="constructor">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {constructor.map((item: any, index: number) => (
                    <ConstructorItem key={index} constructor={item} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="other">
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {fallback.map((item: any, index: number) => (
                    <OtherItem key={index} item={item} />
                  ))}
                  {receive.map((item: any, index: number) => (
                    <OtherItem key={index} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}

export default AbiDisplay
