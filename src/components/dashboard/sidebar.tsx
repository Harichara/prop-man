"use client"

import {
  Home,
  FileText,
  BarChart3,
  Upload,
  Settings,
  Building2,
  Users,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  activeItem: string
  onNavigate: (item: string) => void
}

const mainNavItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "ledger", label: "Ledger", icon: FileText },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "import", label: "Import", icon: Upload },
]

const manageNavItems = [
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "tenants", label: "Tenants", icon: Users },
  { id: "categories", label: "Categories", icon: CreditCard },
]

function NavButton({
  item,
  isCollapsed,
  isActive,
  onNavigate,
}: {
  item: { id: string; label: string; icon: React.ElementType }
  isCollapsed: boolean
  isActive: boolean
  onNavigate: (item: string) => void
}) {
  const button = (
    <Button
      variant="ghost"
      onClick={() => onNavigate(item.id)}
      className={cn(
        "w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent",
        isCollapsed && "justify-center px-2",
        isActive && "bg-sidebar-accent text-sidebar-foreground"
      )}
    >
      <item.icon className="w-4 h-4 shrink-0" />
      {!isCollapsed && <span>{item.label}</span>}
    </Button>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>{button}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    )
  }

  return button
}

export function Sidebar({ isCollapsed, onToggle, activeItem, onNavigate }: SidebarProps) {
  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-income/20 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-income" />
            </div>
            <span className="font-semibold text-sidebar-foreground">PropTrack</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 rounded-lg bg-income/20 flex items-center justify-center mx-auto">
            <Building2 className="w-4 h-4 text-income" />
          </div>
        )}
      </div>

      <Separator className="bg-sidebar-border" />

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 bg-sidebar-accent border-sidebar-border text-sm"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className="px-3 py-2">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isCollapsed={isCollapsed}
                isActive={activeItem === item.id}
                onNavigate={onNavigate}
              />
            ))}
          </div>

          {!isCollapsed && (
            <div className="mt-6 mb-2 px-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Manage
              </span>
            </div>
          )}

          {isCollapsed && <Separator className="my-3 bg-sidebar-border" />}

          <div className="space-y-1 mt-2">
            {manageNavItems.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isCollapsed={isCollapsed}
                isActive={activeItem === item.id}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </nav>
      </ScrollArea>

      {/* User, Settings & Collapse */}
      <Separator className="bg-sidebar-border" />
      <div className="p-3 space-y-1">
        {/* User Avatar */}
        <div
          className={cn(
            "flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent cursor-pointer transition-colors",
            isCollapsed && "justify-center"
          )}
        >
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-gradient-to-br from-income to-teal-400 text-xs font-semibold text-white">
              JD
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@example.com</p>
            </div>
          )}
        </div>

        {isCollapsed ? (
          <>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  onClick={() => onNavigate("settings")}
                  className="w-full justify-center px-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <Settings className="w-4 h-4 shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="ghost"
                  onClick={onToggle}
                  className="w-full justify-center px-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <ChevronRight className="w-4 h-4 shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand</TooltipContent>
            </Tooltip>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              onClick={() => onNavigate("settings")}
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Settings className="w-4 h-4 shrink-0" />
              <span>Settings</span>
            </Button>
            <Button
              variant="ghost"
              onClick={onToggle}
              className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <ChevronLeft className="w-4 h-4 shrink-0" />
              <span>Collapse</span>
            </Button>
          </>
        )}
      </div>
    </aside>
  )
}
