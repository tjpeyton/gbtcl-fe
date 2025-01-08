'use client'

import { useEffect, useState } from 'react'
import { Loader2, Plug } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage, Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { NETWORK_TO_CHAIN_ID } from '@/lib/utils'
import { connectContractSchema } from '@/lib/types/contract'

import { ConnectContractFormProps } from './types'


export const ConnectContractForm = (props: ConnectContractFormProps) => {
  const [csrfToken, setCsrfToken] = useState('')

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('/api/csrf')
      const data = await res.json()
      setCsrfToken(data.token)
    }
    
    fetchToken()
    
    // Refresh every 4 minutes (before 5-minute expiry)
    const interval = setInterval(fetchToken, 4 * 60 * 1000)
        
    return () => clearInterval(interval)
  }, [])

  const form = useForm<z.infer<typeof connectContractSchema>>({
    resolver: zodResolver(connectContractSchema),
    defaultValues: {
      contractAddress: '',
      chain: '',
    },
  })

  return (
    <div className="relative">  
      <Form {...form}>
        <form 
          className="space-y-6" 
          onSubmit={form.handleSubmit((data) => props.onSubmit(data, csrfToken))}>
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Address</FormLabel>
                <FormControl>
                  <Input placeholder="0x..." {...field} />
                </FormControl>
                <FormDescription>
                  The address of the contract you want to connect.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(NETWORK_TO_CHAIN_ID).map(([network, chainId]) => (
                      <SelectItem key={network} value={chainId}>{network}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The network the contract is deployed on.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit">
              <Plug />
              Connect
            </Button>
          </div>
        </form> 
      </Form>
      {props.isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )} 
    </div>
  )   
}
