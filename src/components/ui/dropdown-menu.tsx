"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const DropdownMenuContext = React.createContext<{
  open: boolean
  setOpen: (open: boolean) => void
}>({ open: false, setOpen: () => {} })

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

export function DropdownMenuTrigger({ children, asChild, className, ...props }: any) {
  const { open, setOpen } = React.useContext(DropdownMenuContext)
  const child = asChild ? React.Children.only(children) : (
    <button type="button" className={cn("inline-flex items-center", className)} {...props}>
      {children}
    </button>
  )

  return React.cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      setOpen(!open)
    },
  })
}

export function DropdownMenuContent({ children, align, className, ...props }: any) {
  const { open, setOpen } = React.useContext(DropdownMenuContext)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-popover p-1 shadow-md",
        align === "start" ? "left-0" : "right-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuItem({ className, onClick, children, ...props }: any) {
  const { setOpen } = React.useContext(DropdownMenuContext)

  return (
    <div
      className={cn(
        "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      {...props}
    >
      {children}
    </div>
  )
}

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} />
}
