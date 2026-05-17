"use client";

import { Building2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { properties } from "@/lib/dummy-data";

interface PropertySelectorProps {
  selectedPropertyId: string | null;
  onSelectProperty: (propertyId: string | null) => void;
}

export function PropertySelector({ selectedPropertyId, onSelectProperty }: PropertySelectorProps) {
  return (
    <Select
      value={selectedPropertyId ?? "all"}
      onValueChange={(value) => onSelectProperty(value === "all" ? null : value)}
    >
      <SelectTrigger className="gap-2 bg-card border-border text-foreground">
        <Building2 className="w-4 h-4 text-muted-foreground" />
        <SelectValue placeholder="All Properties" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Properties</SelectItem>
        <SelectSeparator />
        {properties.map((property) => (
          <SelectItem key={property.id} value={property.id}>
            <div>
              <span>{property.name}</span>
              <span className="ml-2 text-muted-foreground text-xs">{property.address}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
