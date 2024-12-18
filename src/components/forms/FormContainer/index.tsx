import { Loader2 } from "lucide-react"

export type FormContainerProps = {
    children: React.ReactNode
    isLoading: boolean
}

export const FormContainer = (props: FormContainerProps) => {
    return (
        <div className="relative">
            {props.children}
            {props.isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <Loader2 className="h-6 w-6 animate-spin" />
                </div>
            )}
        </div>
    )
}  
 