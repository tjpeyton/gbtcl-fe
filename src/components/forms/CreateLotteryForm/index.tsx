'use client'

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormField, FormItem, FormLabel, Form, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { CHAIN_ID_TO_NETWORK } from "@/lib/utils"

import { FormContainer } from "../FormContainer"
import { FormSubmitButton } from "../FormSubmitButton"

import { lotteryFormSchema } from "./schema"
import { CreateLotteryFormProps} from "./types"


export const CreateLotteryForm = (props: CreateLotteryFormProps) => {
    const [csrfToken, setCsrfToken] = useState("")

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
                address: "",
                chainId: 0,
            },        
            ticketPrice: 0,
            maxTickets: 0,
            expiration: 5,
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
                                                <div className="flex flex-col"> 
                                                    <span>{contract.address}</span>
                                                    <span>{CHAIN_ID_TO_NETWORK[contract.chainId]}</span>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="ticketPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ticket Price</FormLabel> 
                                        <FormControl>   
                                            <Input 
                                                type="number"
                                                min={100}
                                                step={10}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(Number(e.target.value))
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
                                control={form.control}
                                name="maxTickets"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Tickets</FormLabel> 
                                        <FormControl>   
                                            <Input 
                                                type="number"
                                                min={1}
                                                step={1}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(Number(e.target.value))
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
                                                step={5}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(Number(e.target.value))
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
                                                step={5}
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(Number(e.target.value))
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
