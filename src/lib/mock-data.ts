export interface User {
  id: string
  name: string
  email: string
}

export interface Property {
  id: string
  address: string
  unitNumber?: string
}

export interface ItemType {
  id: string
  name: string
  icon: string
  href: string
}

export interface Collection {
  id: string
  name: string
  icon: string
  href: string
  isFavorite: boolean
  lastAccessed: string | null
}

export const itemTypes: ItemType[] = [
  { id: "type-transactions", name: "Transactions", icon: "Receipt", href: "/items/transactions" },
  { id: "type-properties", name: "Properties", icon: "Building2", href: "/items/properties" },
  { id: "type-tenants", name: "Tenants", icon: "Users", href: "/items/tenants" },
  { id: "type-categories", name: "Categories", icon: "Tags", href: "/items/categories" },
  { id: "type-reports", name: "Reports", icon: "BarChart3", href: "/items/reports" },
]

export const collections: Collection[] = [
  { id: "col-1", name: "Properties", icon: "Building2", href: "/collections/properties", isFavorite: true, lastAccessed: "2026-03-22" },
  { id: "col-2", name: "Tenant Records", icon: "Folder", href: "/collections/tenants", isFavorite: false, lastAccessed: "2026-03-18" },
  { id: "col-3", name: "Tax Documents", icon: "FileText", href: "/collections/tax", isFavorite: true, lastAccessed: "2026-03-15" },
  { id: "col-4", name: "Receipts", icon: "Image", href: "/collections/receipts", isFavorite: false, lastAccessed: "2026-03-10" },
  { id: "col-5", name: "Maintenance Logs", icon: "Wrench", href: "/collections/maintenance", isFavorite: true, lastAccessed: "2026-03-20" },
  { id: "col-6", name: "Lease Agreements", icon: "FileSignature", href: "/collections/leases", isFavorite: false, lastAccessed: "2026-03-05" },
]

export interface Category {
  id: string
  name: string
  type: "INCOME" | "EXPENSE"
  taxDeductible: boolean
  icon?: string
  color?: string
}

export interface Transaction {
  id: string
  date: string
  amount: number
  description: string
  type: "INCOME" | "EXPENSE"
  categoryId: string
  propertyId?: string
}

export const currentUser: User = {
  id: "user-1",
  name: "Bryan",
  email: "bryan@example.com",
}

export const properties: Property[] = [
  { id: "prop-1", address: "123 Main St", unitNumber: "Unit 1" },
  { id: "prop-2", address: "123 Main St", unitNumber: "Unit 2" },
]

export const categories: Category[] = [
  { id: "cat-rent-1", name: "Rent - Unit 1", type: "INCOME", taxDeductible: false, icon: "home", color: "#10b981" },
  { id: "cat-rent-2", name: "Rent - Unit 2", type: "INCOME", taxDeductible: false, icon: "home", color: "#10b981" },
  { id: "cat-other-income", name: "Other Income", type: "INCOME", taxDeductible: false, icon: "plus-circle", color: "#10b981" },
  { id: "cat-repairs", name: "Repairs & Maintenance", type: "EXPENSE", taxDeductible: true, icon: "wrench", color: "#f59e0b" },
  { id: "cat-electric", name: "Electricity", type: "EXPENSE", taxDeductible: true, icon: "zap", color: "#3b82f6" },
  { id: "cat-gas", name: "Gas", type: "EXPENSE", taxDeductible: true, icon: "flame", color: "#3b82f6" },
  { id: "cat-water", name: "Water", type: "EXPENSE", taxDeductible: true, icon: "droplet", color: "#3b82f6" },
  { id: "cat-trash", name: "Trash", type: "EXPENSE", taxDeductible: true, icon: "trash-2", color: "#3b82f6" },
  { id: "cat-insurance", name: "Insurance", type: "EXPENSE", taxDeductible: true, icon: "shield", color: "#8b5cf6" },
  { id: "cat-tax", name: "Property Tax", type: "EXPENSE", taxDeductible: true, icon: "landmark", color: "#ef4444" },
  { id: "cat-hoa", name: "HOA/Condo Fees", type: "EXPENSE", taxDeductible: true, icon: "building", color: "#64748b" },
  { id: "cat-supplies", name: "Supplies", type: "EXPENSE", taxDeductible: true, icon: "package", color: "#64748b" },
  { id: "cat-mortgage", name: "Mortgage Interest", type: "EXPENSE", taxDeductible: true, icon: "credit-card", color: "#64748b" },
]

export const transactions: Transaction[] = [
  // January 2026
  { id: "txn-01", date: "2026-01-01", amount: 1700, description: "Rent - Unit 1", type: "INCOME", categoryId: "cat-rent-1", propertyId: "prop-1" },
  { id: "txn-02", date: "2026-01-01", amount: 1500, description: "Rent - Unit 2", type: "INCOME", categoryId: "cat-rent-2", propertyId: "prop-2" },
  { id: "txn-03", date: "2026-01-05", amount: -65, description: "Water Bill", type: "EXPENSE", categoryId: "cat-water" },
  { id: "txn-04", date: "2026-01-08", amount: -95, description: "Electric Bill", type: "EXPENSE", categoryId: "cat-electric" },
  { id: "txn-05", date: "2026-01-15", amount: -450, description: "HVAC Repair", type: "EXPENSE", categoryId: "cat-repairs", propertyId: "prop-1" },
  { id: "txn-06", date: "2026-01-20", amount: -180, description: "Insurance Premium", type: "EXPENSE", categoryId: "cat-insurance" },
  { id: "txn-07", date: "2026-01-25", amount: -35, description: "Trash Service", type: "EXPENSE", categoryId: "cat-trash" },
  // February 2026
  { id: "txn-08", date: "2026-02-01", amount: 1700, description: "Rent - Unit 1", type: "INCOME", categoryId: "cat-rent-1", propertyId: "prop-1" },
  { id: "txn-09", date: "2026-02-01", amount: 1500, description: "Rent - Unit 2", type: "INCOME", categoryId: "cat-rent-2", propertyId: "prop-2" },
  { id: "txn-10", date: "2026-02-05", amount: -62, description: "Water Bill", type: "EXPENSE", categoryId: "cat-water" },
  { id: "txn-11", date: "2026-02-08", amount: -88, description: "Electric Bill", type: "EXPENSE", categoryId: "cat-electric" },
  { id: "txn-12", date: "2026-02-12", amount: -45, description: "Gas Bill", type: "EXPENSE", categoryId: "cat-gas" },
  { id: "txn-13", date: "2026-02-18", amount: -220, description: "Plumber - Unit 2", type: "EXPENSE", categoryId: "cat-repairs", propertyId: "prop-2" },
  { id: "txn-14", date: "2026-02-22", amount: -340, description: "Property Tax Payment", type: "EXPENSE", categoryId: "cat-tax" },
  // March 2026
  { id: "txn-15", date: "2026-03-01", amount: 1700, description: "Rent - Unit 1", type: "INCOME", categoryId: "cat-rent-1", propertyId: "prop-1" },
  { id: "txn-16", date: "2026-03-01", amount: 1500, description: "Rent - Unit 2", type: "INCOME", categoryId: "cat-rent-2", propertyId: "prop-2" },
  { id: "txn-17", date: "2026-03-03", amount: -450, description: "HVAC Repair", type: "EXPENSE", categoryId: "cat-repairs", propertyId: "prop-1" },
  { id: "txn-18", date: "2026-03-05", amount: -120, description: "Electric Bill", type: "EXPENSE", categoryId: "cat-electric" },
  { id: "txn-19", date: "2026-03-08", amount: -58, description: "Water Bill", type: "EXPENSE", categoryId: "cat-water" },
  { id: "txn-20", date: "2026-03-12", amount: -87, description: "Home Depot Supplies", type: "EXPENSE", categoryId: "cat-supplies" },
  { id: "txn-21", date: "2026-03-15", amount: -75, description: "Lawn Care", type: "EXPENSE", categoryId: "cat-repairs" },
  { id: "txn-22", date: "2026-03-20", amount: -100, description: "HOA Fees", type: "EXPENSE", categoryId: "cat-hoa" },
  { id: "txn-23", date: "2026-03-22", amount: -950, description: "Mortgage Interest", type: "EXPENSE", categoryId: "cat-mortgage" },
]
