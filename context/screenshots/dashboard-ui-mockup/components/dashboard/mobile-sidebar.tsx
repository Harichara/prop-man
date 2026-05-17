"use client";

import { Home, FileText, BarChart3, Upload, Settings, Building2, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem: string;
  onNavigate: (item: string) => void;
}

const mainNavItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "ledger", label: "Ledger", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "import", label: "Import", icon: Upload },
];

const manageNavItems = [
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "categories", label: "Categories", icon: CreditCard },
];

export function MobileSidebar({ isOpen, onClose, activeItem, onNavigate }: MobileSidebarProps) {
  const handleNavigate = (item: string) => {
    onNavigate(item);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent side="left" className="w-64 p-0 bg-sidebar">
        <SheetHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-income/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-income" />
            </div>
            <SheetTitle className="text-sidebar-foreground">PropTrack</SheetTitle>
          </div>
          <SheetDescription className="sr-only">Navigation menu</SheetDescription>
        </SheetHeader>

        <Separator className="bg-sidebar-border" />

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="px-3 py-4">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    activeItem === item.id && "bg-sidebar-accent text-sidebar-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>

            <div className="mt-6 mb-2 px-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Manage
              </span>
            </div>

            <div className="space-y-1">
              {manageNavItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
                    activeItem === item.id && "bg-sidebar-accent text-sidebar-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </div>
          </nav>
        </ScrollArea>

        {/* Footer */}
        <Separator className="bg-sidebar-border" />
        <div className="p-3 space-y-1">
          <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-br from-income to-teal-400 text-xs font-semibold text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          </div>
          <Button
            variant="ghost"
            onClick={() => handleNavigate("settings")}
            className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
