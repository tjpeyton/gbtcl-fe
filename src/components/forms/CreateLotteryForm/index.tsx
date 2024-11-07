"use client"

import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { FormField, FormItem, FormLabel, Form, FormControl, FormDescription } from "@/components/ui/form"
import { Button } from "@/components/ui/button"

import { lotterySchema } from "./schema"
import { CreateLotteryFormProps} from "./types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CHAIN_ID_TO_NETWORK } from "@/lib/utils"
import { Input } from "@/components/ui/input"


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
    }, [])

    const form = useForm<z.infer<typeof lotterySchema>>({
        resolver: zodResolver(lotterySchema),
        defaultValues: {
            contractAddress: "",        
            chain: "",
            ticketPrice: 0,
            maxTickets: 0,
            expiration: 0,
            commissionPercentage: 0,
        },
    })

    return (
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a contract to deploy lottery on" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {props.contracts.map((contract) => (
                                        <SelectItem key={contract.address} value={contract.address}>
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
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ticketPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ticket Price</FormLabel> 
                            <FormControl>   
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Price of a ticket in Wei
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxTickets"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Tickets</FormLabel> 
                            <FormControl>   
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Maximum number of tickets for this lottery
                            </FormDescription>  
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expiration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expiration</FormLabel> 
                            {/* TODO: Add expiration input */}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="commissionPercentage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commission Percentage</FormLabel> 
                            <FormControl>   
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                Percentage of the jackpot that will be given to the lottery owner
                            </FormDescription>
                        </FormItem> 
                    )}
                />
                <div className="flex justify-end">
                    <Button 
                        type="submit">
                        <Plus />
                        Create Lottery
                    </Button>
                </div>
            </form> 
        </Form>
    )   
}
