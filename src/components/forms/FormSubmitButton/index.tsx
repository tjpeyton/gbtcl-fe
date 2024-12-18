import { Button } from "@/components/ui/button"


export type FormSubmitButtonProps = {
    title: string,
    icon: React.ReactNode,
}

export const FormSubmitButton = (props: FormSubmitButtonProps) => {
    return (
        <div className="flex justify-end">
            <Button
                type="submit">
                {props.icon}
                {props.title}
            </Button>
        </div>
    )
}
