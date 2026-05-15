import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col h-dvh">
      <header className="flex items-center gap-4 border-b border-border px-4 py-2">
        <span className="text-lg font-semibold tracking-tight">Prop.man</span>
        <div className="flex-1 max-w-md">
          <Input placeholder="Search..." className="h-8" />
        </div>
        <Button size="sm">New Item</Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-border p-4">
          <h2 className="text-sm font-medium text-muted-foreground">Sidebar</h2>
        </aside>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
