"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { transactions, getCategoryBreakdown, calculateMetrics } from "@/lib/mock-data"

interface CategoryBreakdownProps {
  selectedPropertyId: string | null
}

function CategoryRow({
  name,
  value,
  total,
  color,
}: {
  name: string
  value: number
  total: number
  color: string
}) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: color }}
          />
          <span className="truncate text-foreground">{name}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <span className="text-muted-foreground text-xs tabular-nums">
            {pct.toFixed(0)}%
          </span>
          <span className="font-medium text-foreground tabular-nums w-16 text-right">
            ${value.toLocaleString()}
          </span>
        </div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export function CategoryBreakdown({
  selectedPropertyId,
}: CategoryBreakdownProps) {
  const { incomeData, expenseData } = getCategoryBreakdown(
    selectedPropertyId,
    transactions
  )
  const { totalIncome, totalExpenses } = calculateMetrics(
    selectedPropertyId,
    transactions
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Income Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              Income by Source
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {incomeData.length} {incomeData.length === 1 ? "source" : "sources"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Headline total */}
          <div>
            <p className="text-2xl font-bold text-income tabular-nums">
              ${totalIncome.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total income this period</p>
          </div>

          <Separator />

          {/* Itemized rows */}
          <ScrollArea className="max-h-[200px]">
            <div className="space-y-3 pr-2">
              {incomeData
                .sort((a, b) => b.value - a.value)
                .map((item) => (
                  <CategoryRow
                    key={item.name}
                    name={item.name}
                    value={item.value}
                    total={totalIncome}
                    color={item.color}
                  />
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Expense Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium">
              Expenses by Category
            </CardTitle>
            <span className="text-xs text-muted-foreground">
              {expenseData.length} {expenseData.length === 1 ? "category" : "categories"}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Headline total */}
          <div>
            <p className="text-2xl font-bold text-expense tabular-nums">
              ${totalExpenses.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">Total expenses this period</p>
          </div>

          <Separator />

          {/* Itemized rows */}
          <ScrollArea className="max-h-[200px]">
            <div className="space-y-3 pr-2">
              {expenseData
                .sort((a, b) => b.value - a.value)
                .map((item) => (
                  <CategoryRow
                    key={item.name}
                    name={item.name}
                    value={item.value}
                    total={totalExpenses}
                    color={item.color}
                  />
                ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
