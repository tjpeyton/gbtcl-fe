import { Copy, ExternalLink, Link } from 'lucide-react'
import { TooltipTrigger, TooltipContent, TooltipProvider, Tooltip } from '@radix-ui/react-tooltip'


import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'


type ContractAddressProps = {
  address: string
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
}


const ContractAddress = ({ address }: ContractAddressProps) => {
  return (
    <div className="flex items-center gap-2">
      {address ? (
        <> 
          <code className="rounded bg-muted px-2 py-1 text-sm">{address}</code>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(address)}
                > 
                  <Copy className="h-4 w-4" />
                  <span className="sr-only">Copy address</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ExternalLink className="h-4 w-4" />
                    <span className="sr-only">View on Etherscan</span>
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on Etherscan</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </>
      ) : (
        <Skeleton className="h-6 w-full" />
      )}
    </div>
  )
}

export default ContractAddress
