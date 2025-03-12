'use client'

import { AlertCircle } from 'lucide-react'

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DialogFooter, DialogHeader } from '@/components/ui/dialog'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import { LotteryDocument, LotteryStatus } from '@/lib/types/lottery'
import { getLotteryStatus } from '@/lib/utils'

import { useState } from 'react'  

type LotteryActionsCardProps = {
  lottery: LotteryDocument
}

const LotteryActionsCard = ({ lottery }: LotteryActionsCardProps) => {
  const [isDrawWinnerDialogOpen, setIsDrawWinnerDialogOpen] = useState(false)
  const [isCancelLotteryDialogOpen, setIsCancelLotteryDialogOpen] = useState(false)
  const [isTransferFundsDialogOpen, setIsTransferFundsDialogOpen] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
        <CardDescription>Manage lottery operations</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <Dialog open={isDrawWinnerDialogOpen} onOpenChange={setIsDrawWinnerDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full" disabled={getLotteryStatus(lottery) !== LotteryStatus.DRAWING}>
              Draw Winner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Draw Lottery Winner</DialogTitle>
              <DialogDescription>
                This action will randomly select a winner from all participants. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                    Drawing a winner will finalize the lottery and prevent further ticket purchases.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsDrawWinnerDialogOpen(false)
              }}>
                Cancel
              </Button>
              <Button onClick={() => {
                setIsDrawWinnerDialogOpen(false)
              }} disabled={true}>
                Confirm Draw
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isCancelLotteryDialogOpen} onOpenChange={setIsCancelLotteryDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full" disabled={getLotteryStatus(lottery) !== LotteryStatus.OPEN}>
              Cancel Lottery
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cancel Lottery</DialogTitle>
              <DialogDescription>
                This action will cancel the lottery and allow participants to withdraw their funds. This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  Canceling the lottery will end it immediately and no winner will be drawn.
                </AlertDescription>
              </Alert>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCancelLotteryDialogOpen(false)
              }}>
                Back
              </Button>
              <Button variant="destructive" onClick={() => {
                setIsCancelLotteryDialogOpen(false)
              }} disabled={true}>
                Confirm Cancellation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Separator />
        
        <Dialog open={isTransferFundsDialogOpen} onOpenChange={setIsTransferFundsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="w-full" disabled={getLotteryStatus(lottery) !== LotteryStatus.WINNER_SELECTED}>
              Transfer Funds to Winner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Transfer Funds to Winner</DialogTitle>
              <DialogDescription>
                This action will transfer the lottery balance to the winner&apos;s address.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4 rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Winner Address</div>
                <code className="rounded bg-muted px-2 py-1 text-sm">0x0000000000000000000000000000000000000000</code>
              </div>
              <div className="rounded-lg border p-4">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Amount to Transfer</div>
                <div className="text-lg font-semibold">1000</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsTransferFundsDialogOpen(false)
              }}>
                Cancel
              </Button>
              <Button onClick={() => {
                setIsTransferFundsDialogOpen(false)
              }} disabled={true}>
                Confirm Transfer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}

export default LotteryActionsCard

