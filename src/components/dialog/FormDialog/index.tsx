import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

export type FormDialogProps = {
  title: string,
  description: string,
  isOpen: boolean,
  setIsOpen: (isOpen: boolean) => void,
  trigger: React.ReactNode,
  form: React.ReactNode
}

const FormDialog = (props: FormDialogProps) => {
  return (
    <Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
      <DialogTrigger>
        {props.trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.form}
      </DialogContent>
    </Dialog>
  )
}

export default FormDialog
