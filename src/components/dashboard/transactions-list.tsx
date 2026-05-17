"use client"

import { MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { transactions, type Transaction } from "@/lib/mock-data"

interface TransactionsListProps {
  selectedPropertyId: string | null
  onSelectTransaction: (transaction: Transaction) => void
}

export function TransactionsList({ selectedPropertyId, onSelectTransaction }: TransactionsListProps) {
  const filteredTransactions = selectedPropertyId
    ? transactions.filter((t) => t.propertyId === selectedPropertyId)
    : transactions

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          View All
        </Button>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="max-h-[480px]">
          {filteredTransactions.slice(0, 8).map((transaction, index) => (
            <div key={transaction.id}>
              <button
                onClick={() => onSelectTransaction(transaction)}
                className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      transaction.type === "income" ? "bg-income/10" : "bg-expense/10"
                    )}
                  >
                    <transaction.categoryIcon
                      className={cn(
                        "w-4 h-4",
                        transaction.type === "income" ? "text-income" : "text-expense"
                      )}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{transaction.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      <Badge
                        variant="secondary"
                        className="text-xs px-1.5 py-0 h-5"
                      >
                        {transaction.category}
                      </Badge>
                      {!selectedPropertyId && (
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          {transaction.propertyName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      transaction.type === "income" ? "text-income" : "text-expense"
                    )}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {transaction.amount.toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-muted-foreground hover:text-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </button>
              {index < filteredTransactions.slice(0, 8).length - 1 && <Separator />}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export type { Transaction }
