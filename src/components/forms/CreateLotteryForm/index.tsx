'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { FormField, FormItem, FormLabel, Form, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FormContainer, FormSubmitButton } from '@/components/forms'

import { CHAIN_ID_TO_NETWORK } from '@/lib/utils'
import { Currency } from '@/lib/types'

import lotteryFormSchema  from './schema'
import { CreateLotteryFormProps} from './types'

const getDefaultPrice = (currency: string) => {
  console.log('currency', currency) 
  switch (currency) {
  case 'ETH':
  case 'SepoliaETH':
    return (0.0000000000000001)
  case 'USDT':
  case 'USDC':
    return 1
  default:
    return 71
  }
}

export const CreateLotteryForm = (props: CreateLotteryFormProps) => {
  const [csrfToken, setCsrfToken] = useState('')
  const [currency, setCurrency] = useState('')
  const [defaultPrice, setDefaultPrice] = useState<number | null>(null)

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
  },[])

  const form = useForm<z.infer<typeof lotteryFormSchema>>({
    resolver: zodResolver(lotteryFormSchema),
    defaultValues: {
      contract: {
        address: undefined,
        chainId: undefined,
      },        
      currency: undefined,
      ticketPrice: undefined,
      maxTickets: 10,
      expiration: 65,
      commissionPercentage: 5,
    },
  })

  return (
    <FormContainer isLoading={props.isLoading}>
      <Form {...form}>
        <form 
          className="space-y-6" 
          onSubmit={form.handleSubmit((data) => {
            props.onSubmit(data, csrfToken)
          })}>
          <FormField
            control={form.control}
            name="contract"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Address</FormLabel> 
                <Select 
                  onValueChange={(value) => {
                    field.onChange({
                      address: value.split('|')[0],
                      chainId: parseInt(value.split('|')[1])
                    })
                  }}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a contract to deploy lottery on" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {props.contracts.map((contract) => (
                      <SelectItem 
                        key={contract.address} 
                        value={`${contract.address}|${contract.chainId}`}>
                        <div className="flex flex-row items-center justify-between"> 
                          <span>{contract.address}</span>
                          <span className="ml-2 text-xs text-gray-500">
                            {CHAIN_ID_TO_NETWORK[contract.chainId]}
                          </span>
                        </div>
                      </SelectItem>
                    ))} 
                  </SelectContent>
                </Select>
                <FormDescription>
                  Available contracts connected to this wallet
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currency</FormLabel> 
                <Select 
                  disabled={!form.watch('contract.address')}  
                  onValueChange={(value) => {
                    field.onChange(value)
                    setCurrency(value)
                    setDefaultPrice(getDefaultPrice(value))
                  }}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a currency for the lottery" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.keys(Currency).map((currency) => (
                      <SelectItem 
                        key={currency} 
                        value={currency}>
                        <div className="flex flex-row items-center justify-between"> 
                          <span> <Badge variant={currency as keyof typeof Currency}>{currency}</Badge></span>
                          <span className="ml-2 text-xs text-gray-500">
                            {Currency[currency as keyof typeof Currency]}
                          </span>
                        </div>
                      </SelectItem>
                    ))} 
                  </SelectContent>
                </Select>
                <FormDescription>
                  Currency for the lottery
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <FormField
                disabled={!currency}
                control={form.control}
                name="ticketPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ticket Price { currency ? `(${currency})` : ''}</FormLabel> 
                    <FormControl>   
                      <Input 
                        type="number"
                        min={0.0000000000000001}
                        defaultValue={defaultPrice ?? ''}
                        className="[appearance:textfield] 
                          [&::-webkit-outer-spin-button]:appearance-none 
                          [&::-webkit-inner-spin-button]:appearance-none"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Number(e.target.value)
                          field.onChange(value)
                        }}  
                      />
                    </FormControl>
                    <FormDescription>
                      Price of a ticket in Wei
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6">
              <FormField
                disabled={!currency}  
                control={form.control}
                name="maxTickets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Tickets</FormLabel> 
                    <FormControl>   
                      <Input 
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Number(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Maximum number of tickets for this lottery
                    </FormDescription>  
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6"> 
              <FormField
                disabled={!currency}
                control={form.control}
                name="expiration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiration</FormLabel> 
                    <FormControl>   
                      <Input 
                        type="number"
                        min={5}
                        max={120}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Number(e.target.value)
                          field.onChange(value)
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      Number of minutes before the lottery expires
                    </FormDescription> 
                    <FormMessage /> 
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-6"> 
              <FormField
                disabled={!currency}
                control={form.control}
                name="commissionPercentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commission Percentage</FormLabel> 
                    <FormControl>   
                      <Input 
                        type="number"
                        min={5}
                        max={50}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value === '' ? '' : Number(e.target.value)
                          field.onChange(value)
                        }}  
                      />
                    </FormControl>
                    <FormDescription>
                      Percentage of the jackpot that will be given to the lottery owner
                    </FormDescription>
                    <FormMessage />
                  </FormItem> 
                )}
              />
            </div>
          </div>
          <FormSubmitButton 
            title="Create Lottery" 
            icon={<Plus />} 
          />
        </form>     
      </Form>
    </FormContainer>    
  )
}   
