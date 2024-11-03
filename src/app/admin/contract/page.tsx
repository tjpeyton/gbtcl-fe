import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Unplug } from "lucide-react"

const AdminContractPage = () => {
  return (
    <>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
                <Unplug />
                Connect Contract
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect Contract</DialogTitle>
              <DialogDescription>
                Connect a deployed lottery contract to the platform
              </DialogDescription>
            </DialogHeader>
            // form here
            <DialogFooter>
              <Button variant="default">Connect</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </>
  )
}

export default AdminContractPage    