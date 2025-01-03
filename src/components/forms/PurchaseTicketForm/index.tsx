'use client'

import { useState, useEffect } from "react"
import { TicketIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form, FormField, FormItem, FormLabel, FormMessage, FormControl, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { FormContainer } from "../FormContainer"
import { FormSubmitButton } from "../FormSubmitButton"

import { PurchaseTicketFormProps } from "./types"
import { purchaseTicketFormSchema } from "./schema" 


export const PurchaseTicketForm = (props: PurchaseTicketFormProps) => {
    const [csrfToken, setCsrfToken] = useState("")
    const [totalCost, setTotalCost] = useState(0)   


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

    const form = useForm<z.infer<typeof purchaseTicketFormSchema>>({
        resolver: zodResolver(purchaseTicketFormSchema),
        defaultValues: {
            count: 1
        },
    })


    return (
        <FormContainer isLoading={props.isLoading}>
            <Form {...form}>
                <form 
                    className="space-y-6" 
                    onSubmit={form.handleSubmit((data) => props.onSubmit(data, csrfToken))}>
                    <FormField
                        control={form.control}
                        name="count"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of tickets</FormLabel>
                                <FormControl>
                                    <Input 
                                        {...field} 
                                        type="number"   
                                        min={1}
                                        max={100}
                                        defaultValue={1}    
                                        onChange={(e) => {
                                            const value = parseInt(e.target.value)
                                            if (value >= 1 && value <= 100) {
                                                setTotalCost(value * props.ticketPrice) 
                                                field.onChange(value)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Total cost of tickets: {Number(form.getValues('count') || 0) * props.ticketPrice} wei 
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormMessage /> 
                    <FormSubmitButton
                        title={`Purchase ${form.getValues('count')} ticket(s) for ${totalCost} wei`}
                        icon={<TicketIcon />    }
                        className="flex-grow"
                    />  
                </form>
            </Form>
        </FormContainer>        
    )
}   