import { Button } from "@/components/ui/button"


export type FormSubmitButtonProps = {
    title: string | React.ReactNode,
    icon: React.ReactNode,
    className?: string,
}

export const FormSubmitButton = (props: FormSubmitButtonProps) => {
    return (
        <div className={props.className}>
            <Button
                size="lg"
                type="submit"
                className="w-full p-6"
            >
                {props.icon}
                {props.title}
            </Button>
        </div>
    )
}
