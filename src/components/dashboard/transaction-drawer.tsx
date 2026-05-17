"use client"

import { Building2, Calendar, Tag, FileText, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import type { Transaction } from "@/lib/mock-data"

interface TransactionDrawerProps {
  transaction: Transaction | null
  isOpen: boolean
  onClose: () => void
}

export function TransactionDrawer({ transaction, isOpen, onClose }: TransactionDrawerProps) {
  if (!transaction) return null

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="right" className="w-full sm:max-w-[400px] p-0">
        <SheetHeader className="p-6 pb-0">
          <SheetTitle>Transaction Details</SheetTitle>
          <SheetDescription className="sr-only">
            Details for {transaction.description}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-6 space-y-6">
            {/* Amount */}
            <div className="text-center py-4">
              <p
                className={cn(
                  "text-4xl font-bold",
                  transaction.type === "income" ? "text-income" : "text-expense"
                )}
              >
                {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
              </p>
              <Badge
                variant="secondary"
                className={cn(
                  "mt-2",
                  transaction.type === "income"
                    ? "bg-income/10 text-income hover:bg-income/10"
                    : "bg-expense/10 text-expense hover:bg-expense/10"
                )}
              >
                {transaction.type === "income" ? "Income" : "Expense"}
              </Badge>
            </div>

            <Separator />

            {/* Details */}
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Description</p>
                  <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="text-sm font-medium text-foreground">{transaction.date}, 2024</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Tag className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className={cn(
                        "w-6 h-6 rounded flex items-center justify-center",
                        transaction.type === "income" ? "bg-income/10" : "bg-expense/10"
                      )}
                    >
                      <transaction.categoryIcon
                        className={cn(
                          "w-3 h-3",
                          transaction.type === "income" ? "text-income" : "text-expense"
                        )}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">{transaction.category}</span>
                  </div>
                </div>
              </div>

              {transaction.propertyName && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                  <Building2 className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Property</p>
                    <p className="text-sm font-medium text-foreground">{transaction.propertyName}</p>
                  </div>
                </div>
              )}

              {/* Attachments placeholder */}
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Paperclip className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Receipts</p>
                  <div className="mt-2 border border-dashed border-border rounded-lg p-4 text-center">
                    <p className="text-xs text-muted-foreground">No receipts attached</p>
                    <Button variant="ghost" size="sm" className="mt-2 text-xs">
                      Upload Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="space-y-2">
              <Button className="w-full" variant="secondary">
                Edit Transaction
              </Button>
              <Button variant="ghost" className="w-full text-expense hover:text-expense hover:bg-expense/10">
                Delete Transaction
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
