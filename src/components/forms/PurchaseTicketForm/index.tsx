'use client'

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { FormContainer } from "../FormContainer"

import { PurchaseTicketFormProps } from "./types"
import { purchaseTicketFormSchema } from "./schema" 


export const PurchaseTicketForm = (props: PurchaseTicketFormProps) => {
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

    const form = useForm<z.infer<typeof purchaseTicketFormSchema>>({
        resolver: zodResolver(purchaseTicketFormSchema),
        defaultValues: {
            count: 0,
            price: 0,
        },
    })


    return (
        <FormContainer isLoading={props.isLoading}>
            <Form {...form}>
                <form 
                    className="space-y-6" 
                    onSubmit={form.handleSubmit((data) => props.onSubmit(data, csrfToken))}>
                    
                </form>
            </Form>
        </FormContainer>
    )
}   