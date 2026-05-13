"use client"

import Link from "next/link"
import {
  PanelLeftClose,
  PanelLeft,
  Receipt,
  Building2,
  Users,
  Tags,
  BarChart3,
  Folder,
  FileText,
  Image,
  Wrench,
  FileSignature,
  Star,
  Clock,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { itemTypes, collections, currentUser } from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  Receipt,
  Building2,
  Users,
  Tags,
  BarChart3,
  Folder,
  FileText,
  Image,
  Wrench,
  FileSignature,
}

function getIcon(name: string) {
  const Icon = iconMap[name]
  return Icon ? <Icon className="size-4 shrink-0" /> : <Folder className="size-4 shrink-0" />
}

interface SidebarProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

export function Sidebar({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }: SidebarProps) {
  const favorites = collections.filter((c) => c.isFavorite)
  const recent = [...collections]
    .filter((c) => c.lastAccessed)
    .sort((a, b) => new Date(b.lastAccessed!).getTime() - new Date(a.lastAccessed!).getTime())
    .slice(0, 5)

  const initials = currentUser.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  function DesktopNav() {
    return (
      <>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "justify-end", "px-2 py-2")}>
          <Button variant="ghost" size="icon-sm" onClick={onToggleCollapse} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            {collapsed ? <PanelLeft className="size-4" /> : <PanelLeftClose className="size-4" />}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-5">
          <div>
            {!collapsed && (
              <h3 className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Items</h3>
            )}
            <div className="mt-1 space-y-0.5">
              {itemTypes.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
                    collapsed && "justify-center px-0"
                  )}
                  title={collapsed ? item.name : undefined}
                >
                  {getIcon(item.icon)}
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              ))}
            </div>
          </div>

          {!collapsed && (
            <>
              <div>
                <h3 className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Star className="size-3" />
                  Favorites
                </h3>
                <div className="mt-1 space-y-0.5">
                  {favorites.map((col) => (
                    <Link
                      key={col.id}
                      href={col.href}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                      {getIcon(col.icon)}
                      <span>{col.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  <Clock className="size-3" />
                  Recent
                </h3>
                <div className="mt-1 space-y-0.5">
                  {recent.map((col) => (
                    <Link
                      key={col.id}
                      href={col.href}
                      className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                    >
                      {getIcon(col.icon)}
                      <span>{col.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </nav>

        <div className={cn("border-t border-border p-3", collapsed && "flex justify-center")}>
          {collapsed ? (
            <div className="size-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-medium text-sidebar-accent-foreground">
              {initials}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="size-8 shrink-0 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-medium text-sidebar-accent-foreground">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }

  function MobileNav() {
    return (
      <>
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-sm font-semibold tracking-tight px-2">Prop.man</span>
          <Button variant="ghost" size="icon-sm" onClick={onCloseMobile} aria-label="Close sidebar">
            <X className="size-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-5">
          <div>
            <h3 className="px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">Items</h3>
            <div className="mt-1 space-y-0.5">
              {itemTypes.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onCloseMobile}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Star className="size-3" />
              Favorites
            </h3>
            <div className="mt-1 space-y-0.5">
              {favorites.map((col) => (
                <Link
                  key={col.id}
                  href={col.href}
                  onClick={onCloseMobile}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  {getIcon(col.icon)}
                  <span>{col.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-1.5 px-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <Clock className="size-3" />
              Recent
            </h3>
            <div className="mt-1 space-y-0.5">
              {recent.map((col) => (
                <Link
                  key={col.id}
                  href={col.href}
                  onClick={onCloseMobile}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                >
                  {getIcon(col.icon)}
                  <span>{col.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t border-border p-3">
          <div className="flex items-center gap-3">
            <div className="size-8 shrink-0 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-medium text-sidebar-accent-foreground">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium truncate">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={onCloseMobile} />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border shadow-lg animate-in slide-in-from-left">
            <MobileNav />
          </aside>
        </div>
      )}

      <aside
        className={cn(
          "hidden md:flex flex-col border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-200",
          collapsed ? "w-14" : "w-60"
        )}
      >
        <DesktopNav />
      </aside>
    </>
  )
}
