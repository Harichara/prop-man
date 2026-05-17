"use client";

import { Menu, Plus, Bell, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  return (
    <TooltipProvider>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-sidebar border-b border-sidebar-border z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="text-sidebar-foreground"
              >
                <Menu className="w-5 h-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Open menu</p>
            </TooltipContent>
          </Tooltip>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-income/20 flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5 text-income" />
            </div>
            <span className="font-semibold text-sidebar-foreground">PropTrack</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground">
                <Bell className="w-5 h-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Notifications</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="text-sidebar-foreground bg-income/20 hover:bg-income/30">
                <Plus className="w-5 h-5 text-income" />
                <span className="sr-only">Add transaction</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Add transaction</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
