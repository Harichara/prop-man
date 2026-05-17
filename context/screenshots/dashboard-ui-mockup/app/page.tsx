"use client";

import { useState } from "react";
import { Plus, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileHeader } from "@/components/dashboard/mobile-header";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { MetricCards } from "@/components/dashboard/metric-cards";
import { TrendsChart } from "@/components/dashboard/trends-chart";
import { TransactionsList } from "@/components/dashboard/transactions-list";
import { CategoryBreakdown } from "@/components/dashboard/category-breakdown";
import { PropertiesGrid } from "@/components/dashboard/properties-grid";
import { TransactionDrawer } from "@/components/dashboard/transaction-drawer";
import { PropertySelector } from "@/components/dashboard/property-selector";
import { type Transaction, properties } from "@/lib/dummy-data";

export default function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("overview");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);

  const handleSelectTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setSelectedTransaction(null), 300);
  };

  const selectedProperty = selectedPropertyId
    ? properties.find((p) => p.id === selectedPropertyId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeItem={activeNavItem}
          onNavigate={setActiveNavItem}
        />
      </div>

      {/* Mobile Header */}
      <MobileHeader onMenuClick={() => setMobileSidebarOpen(true)} />

      {/* Mobile Sidebar */}
      <MobileSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        activeItem={activeNavItem}
        onNavigate={setActiveNavItem}
      />

      {/* Main Content */}
      <main
        className={cn(
          "transition-all duration-300 pt-14 lg:pt-0",
          sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
        )}
      >
        {/* Header */}
        <header className="hidden lg:flex items-center justify-between px-6 py-4 bg-background sticky top-0 z-20">
          <div>
            <h1 className="text-xl font-semibold text-foreground text-balance">
              {selectedProperty ? selectedProperty.name : "Dashboard"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {selectedProperty
                ? `${selectedProperty.address} - ${selectedProperty.units} unit${selectedProperty.units > 1 ? "s" : ""}`
                : "Welcome back! Here's your property overview for May 2024."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <PropertySelector
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={setSelectedPropertyId}
            />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Bell className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notifications</TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">May 2024</span>
            </div>
            <Button className="bg-income hover:bg-income/90 text-primary-foreground gap-2">
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
          </div>
        </header>

        <Separator className="hidden lg:block" />

        {/* Mobile Property Selector */}
        <div className="lg:hidden px-4 py-3 border-b border-border bg-background">
          <PropertySelector
            selectedPropertyId={selectedPropertyId}
            onSelectProperty={setSelectedPropertyId}
          />
        </div>

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {/* Metric Cards */}
          <MetricCards selectedPropertyId={selectedPropertyId} />

          {/* Properties Grid - only show when viewing all properties */}
          {!selectedPropertyId && <PropertiesGrid onSelectProperty={setSelectedPropertyId} />}

          {/* Charts Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <TrendsChart selectedPropertyId={selectedPropertyId} />
            <CategoryBreakdown selectedPropertyId={selectedPropertyId} />
          </div>

          {/* Transactions List */}
          <TransactionsList
            selectedPropertyId={selectedPropertyId}
            onSelectTransaction={handleSelectTransaction}
          />
        </div>
      </main>

      {/* Transaction Drawer */}
      <TransactionDrawer
        transaction={selectedTransaction}
        isOpen={drawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
