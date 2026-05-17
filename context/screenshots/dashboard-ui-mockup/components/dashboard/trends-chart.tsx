"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { monthlyDataByProperty } from "@/lib/dummy-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface TrendsChartProps {
  selectedPropertyId: string | null;
}

function formatCurrency(value: number) {
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
  return `$${value}`;
}

export function TrendsChart({ selectedPropertyId }: TrendsChartProps) {
  const monthlyData = monthlyDataByProperty[selectedPropertyId || "all"];
  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];

  const incomeChange = previousMonth
    ? ((currentMonth.income - previousMonth.income) / previousMonth.income) * 100
    : 0;
  const expenseChange = previousMonth
    ? ((currentMonth.expense - previousMonth.expense) / previousMonth.expense) * 100
    : 0;
  const currentNet = currentMonth.income - currentMonth.expense;
  const previousNet = previousMonth
    ? previousMonth.income - previousMonth.expense
    : currentNet;
  const netChange = previousNet !== 0
    ? ((currentNet - previousNet) / Math.abs(previousNet)) * 100
    : 0;

  function TrendIcon({ value }: { value: number }) {
    if (value > 0) return <TrendingUp className="w-3 h-3" />;
    if (value < 0) return <TrendingDown className="w-3 h-3" />;
    return <Minus className="w-3 h-3" />;
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium text-card-foreground">
          Monthly Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Headline numbers */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Income</p>
            <p className="text-lg font-semibold text-income">
              ${currentMonth.income.toLocaleString()}
            </p>
            <Badge
              variant="outline"
              className={
                incomeChange >= 0
                  ? "text-income border-income/30 bg-income/10 text-[10px] px-1.5 py-0"
                  : "text-expense border-expense/30 bg-expense/10 text-[10px] px-1.5 py-0"
              }
            >
              <TrendIcon value={incomeChange} />
              <span className="ml-0.5">{Math.abs(incomeChange).toFixed(0)}%</span>
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Expenses</p>
            <p className="text-lg font-semibold text-expense">
              ${currentMonth.expense.toLocaleString()}
            </p>
            <Badge
              variant="outline"
              className={
                expenseChange <= 0
                  ? "text-income border-income/30 bg-income/10 text-[10px] px-1.5 py-0"
                  : "text-expense border-expense/30 bg-expense/10 text-[10px] px-1.5 py-0"
              }
            >
              <TrendIcon value={expenseChange} />
              <span className="ml-0.5">{Math.abs(expenseChange).toFixed(0)}%</span>
            </Badge>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Net</p>
            <p className={`text-lg font-semibold ${currentNet >= 0 ? "text-income" : "text-expense"}`}>
              ${Math.abs(currentNet).toLocaleString()}
            </p>
            <Badge
              variant="outline"
              className={
                netChange >= 0
                  ? "text-income border-income/30 bg-income/10 text-[10px] px-1.5 py-0"
                  : "text-expense border-expense/30 bg-expense/10 text-[10px] px-1.5 py-0"
              }
            >
              <TrendIcon value={netChange} />
              <span className="ml-0.5">{Math.abs(netChange).toFixed(0)}%</span>
            </Badge>
          </div>
        </div>

        <Separator />

        {/* Compact grouped bar chart */}
        <div className="h-[180px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 4, right: 0, left: -20, bottom: 0 }}
              barGap={2}
              barCategoryGap="20%"
            >
              <XAxis
                dataKey="month"
                stroke="oklch(0.5 0 0)"
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="oklch(0.5 0 0)"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatCurrency}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: "oklch(0.18 0.005 260)",
                  border: "1px solid oklch(0.28 0.005 260)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0 0)",
                  fontSize: "12px",
                }}
                formatter={(value: number, name: string) => [
                  `$${value.toLocaleString()}`,
                  name === "income" ? "Income" : "Expenses",
                ]}
                labelStyle={{ color: "oklch(0.65 0 0)" }}
              />
              <Bar
                dataKey="income"
                fill="oklch(0.72 0.19 160)"
                radius={[3, 3, 0, 0]}
                maxBarSize={24}
              />
              <Bar
                dataKey="expense"
                fill="oklch(0.65 0.2 25)"
                radius={[3, 3, 0, 0]}
                maxBarSize={24}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inline legend */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-income" />
            <span>Income</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-expense" />
            <span>Expenses</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
