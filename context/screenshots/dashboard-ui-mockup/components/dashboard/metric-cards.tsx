"use client";

import { TrendingUp, TrendingDown, DollarSign, Minus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { transactions, calculateMetrics } from "@/lib/dummy-data";

interface MetricCardProps {
  title: string;
  value: string;
  trend: string;
  trendDirection: "up" | "down" | "neutral";
  type: "income" | "expense" | "net";
}

function MetricCard({ title, value, trend, trendDirection, type }: MetricCardProps) {
  const colorMap = {
    income: "text-income",
    expense: "text-expense",
    net: "text-info",
  };

  const bgMap = {
    income: "bg-income/10",
    expense: "bg-expense/10",
    net: "bg-info/10",
  };

  const TrendIcon =
    trendDirection === "up" ? TrendingUp : trendDirection === "down" ? TrendingDown : Minus;

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">{title}</span>
          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", bgMap[type])}>
            <DollarSign className={cn("w-4 h-4", colorMap[type])} />
          </div>
        </div>
        <div className="space-y-1">
          <p className={cn("text-2xl font-bold", colorMap[type])}>{value}</p>
          <div className="flex items-center gap-1">
            <TrendIcon
              className={cn(
                "w-3 h-3",
                trendDirection === "up" && "text-income",
                trendDirection === "down" && "text-expense",
                trendDirection === "neutral" && "text-muted-foreground"
              )}
            />
            <span
              className={cn(
                "text-xs",
                trendDirection === "up" && "text-income",
                trendDirection === "down" && "text-expense",
                trendDirection === "neutral" && "text-muted-foreground"
              )}
            >
              {trend} from last month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardsProps {
  selectedPropertyId: string | null;
}

export function MetricCards({ selectedPropertyId }: MetricCardsProps) {
  const { totalIncome, totalExpenses, netIncome } = calculateMetrics(
    selectedPropertyId,
    transactions
  );

  const metrics = [
    {
      title: "Total Income",
      value: `$${totalIncome.toLocaleString()}`,
      trend: "+0%",
      trendDirection: "neutral" as const,
      type: "income" as const,
    },
    {
      title: "Total Expenses",
      value: `$${totalExpenses.toLocaleString()}`,
      trend: "-12%",
      trendDirection: "down" as const,
      type: "expense" as const,
    },
    {
      title: "Net Income",
      value: `$${netIncome.toLocaleString()}`,
      trend: "+23%",
      trendDirection: "up" as const,
      type: "net" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
