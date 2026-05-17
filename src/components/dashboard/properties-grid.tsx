"use client"

import { Building2, Users, TrendingUp, MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { properties, transactions, calculateMetrics } from "@/lib/mock-data"

interface PropertiesGridProps {
  onSelectProperty: (propertyId: string) => void
}

export function PropertiesGrid({ onSelectProperty }: PropertiesGridProps) {
  const propertiesWithMetrics = properties.map((property) => {
    const metrics = calculateMetrics(property.id, transactions)
    return {
      ...property,
      monthlyIncome: metrics.totalIncome,
      monthlyExpenses: metrics.totalExpenses,
      netIncome: metrics.netIncome,
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Your Properties</h2>
        <Button variant="secondary" size="sm">
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {propertiesWithMetrics.map((property) => (
          <Card
            key={property.id}
            onClick={() => onSelectProperty(property.id)}
            className="hover:border-muted-foreground/30 transition-colors cursor-pointer"
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{property.name}</h3>
                    <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                      {property.address}
                    </p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 text-muted-foreground hover:text-foreground"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="w-4 h-4" />
                      <span className="sr-only">Property options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit Property
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-expense focus:text-expense">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {property.units} {property.units === 1 ? "Unit" : "Units"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className={
                      property.occupancy === 100
                        ? "bg-income/10 text-income hover:bg-income/10"
                        : "bg-warning/10 text-warning hover:bg-warning/10"
                    }
                  >
                    {property.occupancy}% Occupied
                  </Badge>
                </div>
              </div>

              <Separator className="mb-3" />

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Monthly Income</p>
                    <p className="font-semibold text-income">
                      ${property.monthlyIncome.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground text-xs">Monthly Expenses</p>
                    <p className="font-semibold text-expense">
                      ${property.monthlyExpenses.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-income" />
                  <span className="text-xs text-income">
                    Net: ${property.netIncome.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
