import { Home, Wrench, Zap, Droplets, Shield, FileText } from "lucide-react";

export interface Property {
  id: string;
  name: string;
  address: string;
  units: number;
  occupancy: number;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  categoryIcon: React.ElementType;
  amount: number;
  type: "income" | "expense";
  propertyId: string;
  propertyName: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export const properties: Property[] = [
  {
    id: "oak-street",
    name: "Oak Street Duplex",
    address: "123 Oak Street",
    units: 2,
    occupancy: 100,
  },
  {
    id: "maple-avenue",
    name: "Maple Avenue Home",
    address: "456 Maple Avenue",
    units: 1,
    occupancy: 100,
  },
  {
    id: "pine-street",
    name: "Pine Street Triplex",
    address: "789 Pine Street",
    units: 3,
    occupancy: 67,
  },
];

export const transactions: Transaction[] = [
  {
    id: "1",
    date: "May 1",
    description: "Rent Payment - Unit 1",
    category: "Rent",
    categoryIcon: Home,
    amount: 1600,
    type: "income",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "2",
    date: "May 1",
    description: "Rent Payment - Unit 2",
    category: "Rent",
    categoryIcon: Home,
    amount: 1600,
    type: "income",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "3",
    date: "May 1",
    description: "Rent Payment",
    category: "Rent",
    categoryIcon: Home,
    amount: 1800,
    type: "income",
    propertyId: "maple-avenue",
    propertyName: "Maple Avenue Home",
  },
  {
    id: "4",
    date: "May 1",
    description: "Rent Payment - Unit 1",
    category: "Rent",
    categoryIcon: Home,
    amount: 1200,
    type: "income",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
  {
    id: "5",
    date: "May 1",
    description: "Rent Payment - Unit 2",
    category: "Rent",
    categoryIcon: Home,
    amount: 1200,
    type: "income",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
  {
    id: "6",
    date: "May 3",
    description: "HVAC Repair - Compressor",
    category: "Repairs",
    categoryIcon: Wrench,
    amount: 850,
    type: "expense",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "7",
    date: "May 5",
    description: "Electric Bill - Common Areas",
    category: "Utilities",
    categoryIcon: Zap,
    amount: 145,
    type: "expense",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "8",
    date: "May 5",
    description: "Electric Bill",
    category: "Utilities",
    categoryIcon: Zap,
    amount: 95,
    type: "expense",
    propertyId: "maple-avenue",
    propertyName: "Maple Avenue Home",
  },
  {
    id: "9",
    date: "May 5",
    description: "Electric Bill - Common Areas",
    category: "Utilities",
    categoryIcon: Zap,
    amount: 180,
    type: "expense",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
  {
    id: "10",
    date: "May 8",
    description: "Water & Sewer Bill",
    category: "Utilities",
    categoryIcon: Droplets,
    amount: 87,
    type: "expense",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "11",
    date: "May 8",
    description: "Water & Sewer Bill",
    category: "Utilities",
    categoryIcon: Droplets,
    amount: 65,
    type: "expense",
    propertyId: "maple-avenue",
    propertyName: "Maple Avenue Home",
  },
  {
    id: "12",
    date: "May 8",
    description: "Water & Sewer Bill",
    category: "Utilities",
    categoryIcon: Droplets,
    amount: 120,
    type: "expense",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
  {
    id: "13",
    date: "May 10",
    description: "Property Insurance Premium",
    category: "Insurance",
    categoryIcon: Shield,
    amount: 225,
    type: "expense",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "14",
    date: "May 10",
    description: "Property Insurance Premium",
    category: "Insurance",
    categoryIcon: Shield,
    amount: 175,
    type: "expense",
    propertyId: "maple-avenue",
    propertyName: "Maple Avenue Home",
  },
  {
    id: "15",
    date: "May 10",
    description: "Property Insurance Premium",
    category: "Insurance",
    categoryIcon: Shield,
    amount: 280,
    type: "expense",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
  {
    id: "16",
    date: "May 12",
    description: "Lawn Maintenance Service",
    category: "Repairs",
    categoryIcon: Wrench,
    amount: 75,
    type: "expense",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "17",
    date: "May 12",
    description: "Lawn Maintenance Service",
    category: "Repairs",
    categoryIcon: Wrench,
    amount: 60,
    type: "expense",
    propertyId: "maple-avenue",
    propertyName: "Maple Avenue Home",
  },
  {
    id: "18",
    date: "May 15",
    description: "Property Tax Q2",
    category: "Tax",
    categoryIcon: FileText,
    amount: 490,
    type: "expense",
    propertyId: "oak-street",
    propertyName: "Oak Street Duplex",
  },
  {
    id: "19",
    date: "May 15",
    description: "Property Tax Q2",
    category: "Tax",
    categoryIcon: FileText,
    amount: 380,
    type: "expense",
    propertyId: "maple-avenue",
    propertyName: "Maple Avenue Home",
  },
  {
    id: "20",
    date: "May 15",
    description: "Property Tax Q2",
    category: "Tax",
    categoryIcon: FileText,
    amount: 520,
    type: "expense",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
  {
    id: "21",
    date: "May 18",
    description: "Plumbing Repair - Unit 3",
    category: "Repairs",
    categoryIcon: Wrench,
    amount: 320,
    type: "expense",
    propertyId: "pine-street",
    propertyName: "Pine Street Triplex",
  },
];

// Monthly data by property
export const monthlyDataByProperty: Record<string, MonthlyData[]> = {
  all: [
    { month: "Jan", income: 7400, expense: 3200 },
    { month: "Feb", income: 7400, expense: 2800 },
    { month: "Mar", income: 7400, expense: 3100 },
    { month: "Apr", income: 7400, expense: 2500 },
    { month: "May", income: 7400, expense: 3747 },
    { month: "Jun", income: 7400, expense: 2100 },
  ],
  "oak-street": [
    { month: "Jan", income: 3200, expense: 1400 },
    { month: "Feb", income: 3200, expense: 1200 },
    { month: "Mar", income: 3200, expense: 1350 },
    { month: "Apr", income: 3200, expense: 1100 },
    { month: "May", income: 3200, expense: 1872 },
    { month: "Jun", income: 3200, expense: 900 },
  ],
  "maple-avenue": [
    { month: "Jan", income: 1800, expense: 800 },
    { month: "Feb", income: 1800, expense: 700 },
    { month: "Mar", income: 1800, expense: 750 },
    { month: "Apr", income: 1800, expense: 650 },
    { month: "May", income: 1800, expense: 775 },
    { month: "Jun", income: 1800, expense: 550 },
  ],
  "pine-street": [
    { month: "Jan", income: 2400, expense: 1000 },
    { month: "Feb", income: 2400, expense: 900 },
    { month: "Mar", income: 2400, expense: 1000 },
    { month: "Apr", income: 2400, expense: 750 },
    { month: "May", income: 2400, expense: 1100 },
    { month: "Jun", income: 2400, expense: 650 },
  ],
};

// Helper function to calculate metrics
export function calculateMetrics(propertyId: string | null, transactionsList: Transaction[]) {
  const filtered = propertyId
    ? transactionsList.filter((t) => t.propertyId === propertyId)
    : transactionsList;

  const totalIncome = filtered
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = filtered
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, netIncome };
}

// Helper function to get category breakdown
export function getCategoryBreakdown(propertyId: string | null, transactionsList: Transaction[]) {
  const filtered = propertyId
    ? transactionsList.filter((t) => t.propertyId === propertyId)
    : transactionsList;

  const incomeBySource: Record<string, number> = {};
  const expenseByCategory: Record<string, number> = {};

  filtered.forEach((t) => {
    if (t.type === "income") {
      const key = propertyId ? t.description : t.propertyName;
      incomeBySource[key] = (incomeBySource[key] || 0) + t.amount;
    } else {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
    }
  });

  const incomeColors = [
    "oklch(0.72 0.19 160)",
    "oklch(0.6 0.15 160)",
    "oklch(0.55 0.12 160)",
    "oklch(0.7 0.17 140)",
  ];

  const expenseColors: Record<string, string> = {
    Repairs: "oklch(0.75 0.18 75)",
    Utilities: "oklch(0.65 0.2 260)",
    Insurance: "oklch(0.7 0.15 300)",
    Tax: "oklch(0.65 0.2 25)",
  };

  const incomeData: CategoryData[] = Object.entries(incomeBySource).map(([name, value], i) => ({
    name,
    value,
    color: incomeColors[i % incomeColors.length],
  }));

  const expenseData: CategoryData[] = Object.entries(expenseByCategory).map(([name, value]) => ({
    name,
    value,
    color: expenseColors[name] || "oklch(0.6 0.1 260)",
  }));

  return { incomeData, expenseData };
}
