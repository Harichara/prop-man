# 🏠 Property Management Expense Tracker - Project Overview

> Automated financial tracking for small-scale landlords

---

## 📋 Table of Contents
- [Problem Statement](#-problem-statement)
- [Users](#-users)
- [Features](#-features)
- [Data Architecture](#-data-architecture)
- [Technology Stack](#-technology-stack)
- [UI/UX Design](#-uiux-design)
- [Documentation Plan](#-documentation-plan)
- [Build Phases](#-build-phases)
- [Resources](#-resources)

---

## 🎯 Problem Statement

### What problem are we solving?

**Pain Points:**
- 📝 Manual expense entry is inconsistent and creates gaps in financial records
- 💸 Difficult to track rent payments and property expenses in real-time
- 📊 Time-consuming to compile tax documentation at year-end
- 🔍 No centralized view of property financial performance
- 💰 Risk of missing deductible expenses without automated tracking

**Goal:** Create an automated system that imports bank transactions, categorizes them intelligently, and provides tax-ready reports with minimal manual effort.

---

## 👥 Users

### Primary User
**You** - Small-scale landlord managing a 2-unit duplex
- Full-stack developer with technical skills
- Needs efficient expense tracking
- Wants tax-compliant record keeping
- Values automation over manual data entry

### Secondary Users
- **Accountant/Tax Preparer** - Consumes exported reports
- **Future Tenants** - May use payment portal (future feature)

---

## ✨ Features

### MVP Features (Phase 1-3)

#### 🏦 Transaction Management
- **Bank Transaction Import** - CSV upload from bank statements
- **Manual Entry** - Fallback for cash payments or missing data
- **Auto-Categorization** - Rule-based expense/income classification
- **Bulk Operations** - Edit multiple transactions at once

#### 📊 Ledger & Analytics
- **Chronological Ledger** - Sortable, filterable transaction table
- **Dashboard** - Monthly income/expense, YTD totals, trends
- **Category Breakdown** - Pie/bar charts showing expense distribution
- **Tax Reports** - IRS Schedule E aligned summaries

#### 🏷️ Categorization System
- **Income Categories** - Rent (Unit 1), Rent (Unit 2), Other Income
- **Expense Categories:**
  - Repairs & Maintenance
  - Utilities (Gas, Electric, Water, Trash)
  - Insurance
  - Property Tax
  - HOA/Condo Fees
  - Professional Services (Legal, Accounting, Property Management)
  - Supplies
  - Mortgage Interest
  - Advertising
  - Auto/Travel (for property visits)
  - Other

#### 📤 Export & Reporting
- CSV export for accountant
- PDF summary reports
- Year-end tax package

### Post-MVP Features (Phase 4+)

- 🔗 **Plaid Integration** - Automatic bank sync
- 📸 **Receipt OCR** - Upload and attach receipts to transactions
- 👥 **Tenant Management** - Profiles, lease tracking, payment history
- 🔔 **Automated Alerts** - Missed rent, upcoming lease renewals
- 📈 **Advanced Analytics** - ROI, cash flow projections, multi-year trends
- 📱 **Mobile App** - React Native companion app

---

## 🗄️ Data Architecture

### System Architecture Diagram
```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │
         │ REST API
         │
┌────────▼────────┐      ┌──────────────┐
│   Backend       │      │   Plaid API  │
│ (Node/Express)  │◄─────┤  (Future)    │
└────────┬────────┘      └──────────────┘
         │
         │
┌────────▼────────┐      ┌──────────────┐
│  PostgreSQL     │      │  AWS S3      │
│  Database       │      │  (Receipts)  │
└─────────────────┘      └──────────────┘
```

### Database Schema (Prisma Models)
```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Property {
  id          String   @id @default(cuid())
  address     String
  unitNumber  String?  // "Unit 1", "Unit 2"
  purchaseDate DateTime?
  purchasePrice Decimal? @db.Decimal(10, 2)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  tenants     Tenant[]
  transactions Transaction[]
  
  @@map("properties")
}

model Tenant {
  id           String   @id @default(cuid())
  firstName    String
  lastName     String
  email        String?
  phone        String?
  propertyId   String
  leaseStart   DateTime
  leaseEnd     DateTime
  monthlyRent  Decimal  @db.Decimal(10, 2)
  securityDeposit Decimal? @db.Decimal(10, 2)
  status       TenantStatus @default(ACTIVE)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  property     Property @relation(fields: [propertyId], references: [id])
  
  @@map("tenants")
}

enum TenantStatus {
  ACTIVE
  INACTIVE
  EVICTED
}

model Transaction {
  id              String   @id @default(cuid())
  date            DateTime
  amount          Decimal  @db.Decimal(10, 2)
  description     String
  type            TransactionType
  categoryId      String?
  propertyId      String?
  source          TransactionSource @default(MANUAL)
  bankTransactionId String? @unique // For deduplication
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  category        Category? @relation(fields: [categoryId], references: [id])
  property        Property? @relation(fields: [propertyId], references: [id])
  receipts        Receipt[]
  
  @@index([date])
  @@index([categoryId])
  @@index([propertyId])
  @@map("transactions")
}

enum TransactionType {
  INCOME
  EXPENSE
}

enum TransactionSource {
  MANUAL
  CSV_IMPORT
  BANK_SYNC
}

model Category {
  id              String   @id @default(cuid())
  name            String   @unique
  type            TransactionType
  taxDeductible   Boolean  @default(false)
  scheduleELine   String?  // IRS Schedule E line reference
  icon            String?  // Emoji or icon name
  color           String?  // Hex color for UI
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  transactions    Transaction[]
  rules           CategorizationRule[]
  
  @@map("categories")
}

model CategorizationRule {
  id          String   @id @default(cuid())
  categoryId  String
  pattern     String   // Keyword or regex pattern
  priority    Int      @default(0) // Higher priority rules run first
  enabled     Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  category    Category @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  
  @@map("categorization_rules")
}

model Receipt {
  id             String   @id @default(cuid())
  transactionId  String
  fileName       String
  fileUrl        String
  fileSize       Int
  mimeType       String
  uploadedAt     DateTime @default(now())
  
  transaction    Transaction @relation(fields: [transactionId], references: [id], onDelete: Cascade)
  
  @@map("receipts")
}

model BankAccount {
  id              String   @id @default(cuid())
  institution     String
  accountName     String
  accountType     String   // "checking", "savings", "credit"
  last4           String   // Last 4 digits
  plaidAccessToken String? // Encrypted in production
  plaidItemId     String?
  lastSyncAt      DateTime?
  balance         Decimal? @db.Decimal(10, 2)
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@map("bank_accounts")
}
```

### Entity Relationship Diagram
```
┌─────────────┐         ┌─────────────┐
│  Property   │────────<│   Tenant    │
└──────┬──────┘         └─────────────┘
       │
       │ 1:N
       │
┌──────▼──────────┐
│  Transaction    │
└──────┬──────────┘
       │
       │ N:1
       │
┌──────▼──────┐      ┌────────────────────┐
│  Category   │─────<│ CategorizationRule │
└─────────────┘      └────────────────────┘

┌─────────────┐
│ Transaction │────────<┌──────────┐
└─────────────┘         │ Receipt  │
                        └──────────┘

┌─────────────┐
│ BankAccount │ (standalone for now)
└─────────────┘
```

---

## 🛠️ Technology Stack

### Backend

| Component | Technology | Why? |
|-----------|------------|------|
| **Runtime** | Node.js 20+ | JavaScript full-stack consistency |
| **Framework** | Express.js | Simple, mature, great ecosystem |
| **ORM** | Prisma | Type-safe, excellent DX, migrations |
| **Database** | PostgreSQL 15+ | ACID compliance, financial data integrity |
| **Validation** | Zod | Type-safe runtime validation |
| **Authentication** | JWT + bcrypt | Stateless auth for future API access |
| **Bank Integration** | Plaid API | Industry standard, 12K+ institutions |

**Key Dependencies:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "@prisma/client": "^5.9.0",
    "zod": "^3.22.4",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "csv-parse": "^5.5.3",
    "dotenv": "^16.4.1",
    "cors": "^2.8.5"
  }
}
```

### Frontend

| Component | Technology | Why? |
|-----------|------------|------|
| **Framework** | Next.js 14 (App Router) | SSR, API routes, great DX |
| **Language** | TypeScript | Type safety across stack |
| **UI Library** | shadcn/ui + Tailwind CSS | Beautiful, customizable components |
| **State** | Zustand | Simple, minimal boilerplate |
| **Data Fetching** | TanStack Query | Caching, background refetch |
| **Forms** | React Hook Form + Zod | Performant validation |
| **Charts** | Recharts | React-native charts, composable |
| **Tables** | TanStack Table | Powerful filtering/sorting |

**Key Dependencies:**
```json
{
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "typescript": "^5.3.3",
    "@tanstack/react-query": "^5.17.19",
    "@tanstack/react-table": "^8.11.6",
    "react-hook-form": "^7.49.3",
    "zod": "^3.22.4",
    "zustand": "^4.5.0",
    "recharts": "^2.10.3",
    "date-fns": "^3.2.0",
    "lucide-react": "^0.312.0"
  }
}
```

### Infrastructure & DevOps

| Component | Technology | Notes |
|-----------|------------|-------|
| **Hosting (Frontend)** | Vercel | Zero-config Next.js deployment |
| **Hosting (Backend)** | Railway or Render | Easy PostgreSQL + Node.js |
| **Database** | Railway/Render Postgres | Managed, automatic backups |
| **File Storage** | AWS S3 or Cloudflare R2 | Receipt/document storage |
| **Version Control** | GitHub | Standard git workflow |
| **CI/CD** | GitHub Actions | Automated testing, deployment |
| **Monitoring** | Sentry (errors) + Vercel Analytics | Error tracking, performance |

### Development Tools

- **Package Manager:** pnpm (fast, efficient)
- **Code Quality:** ESLint + Prettier
- **Git Hooks:** Husky + lint-staged
- **API Testing:** Postman or Thunder Client
- **Database Client:** Prisma Studio or TablePlus

---

## 🎨 UI/UX Design

### Design Principles

1. **🎯 Clarity Over Cleverness** - Financial data should be immediately comprehensible
2. **⚡ Speed** - Common tasks should be < 3 clicks
3. **📱 Mobile-First** - Check finances on the go
4. **🌗 Subtle & Professional** - Clean interface, let data speak

### Color System
```css
/* Semantic Colors */
--color-income: #10b981;      /* Green - money in */
--color-expense: #ef4444;     /* Red - money out */
--color-neutral: #64748b;     /* Slate - transfers */
--color-warning: #f59e0b;     /* Amber - alerts */
--color-info: #3b82f6;        /* Blue - info */

/* Category Colors */
--cat-rent: #10b981;
--cat-maintenance: #f59e0b;
--cat-utilities: #3b82f6;
--cat-insurance: #8b5cf6;
--cat-tax: #ef4444;
```

### Key Pages & Wireframes

#### 1. 📊 Dashboard (Landing Page)
```
┌─────────────────────────────────────────────────┐
│  🏠 Property Tracker        [+] Add Transaction │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Income  │  │ Expense │  │ Net     │        │
│  │ $3,200  │  │ $1,450  │  │ $1,750  │        │
│  │ ↑ 0%    │  │ ↓ 12%   │  │ ↑ 23%   │        │
│  └─────────┘  └─────────┘  └─────────┘        │
│                                                 │
│  📈 Monthly Trends                              │
│  ┌───────────────────────────────────────────┐ │
│  │     [Bar Chart: Income vs Expense]        │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  🔴 Recent Transactions                         │
│  ┌───────────────────────────────────────────┐ │
│  │ Mar 1  Rent - Unit 1      +$1,600 🏠     │ │
│  │ Mar 3  HVAC Repair         -$450  🔧     │ │
│  │ Mar 5  Electric Bill       -$120  ⚡     │ │
│  └───────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

#### 2. 📑 Ledger (Transaction List)
```
┌─────────────────────────────────────────────────┐
│  📑 Ledger                                      │
├─────────────────────────────────────────────────┤
│  [Search] 🔍  [Filters ▼] [Export CSV]         │
│                                                 │
│  Date ↓ | Description | Category | Amount      │
│  ────────────────────────────────────────────  │
│  03/15  | Tenant A    | Rent     | +$1,600    │
│  03/12  | Plumber     | Repair   |   -$350    │
│  03/08  | Home Depot  | Supplies |    -$87    │
│  03/05  | Water Bill  | Utilities|   -$45     │
│                                                 │
│  [← Prev]  Page 1 of 8  [Next →]               │
└─────────────────────────────────────────────────┘
```

#### 3. 📊 Analytics
```
┌─────────────────────────────────────────────────┐
│  📊 Analytics                                   │
├─────────────────────────────────────────────────┤
│  [2024 ▼]  [All Properties ▼]                  │
│                                                 │
│  💰 Income Breakdown                            │
│  ┌────────────────────┐                        │
│  │  [Pie Chart]       │  Rent Unit 1: 50%      │
│  │                    │  Rent Unit 2: 48%      │
│  │                    │  Other: 2%             │
│  └────────────────────┘                        │
│                                                 │
│  💸 Expense Categories                          │
│  ┌────────────────────┐                        │
│  │  Repairs      $2,400  ████████ 40%         │
│  │  Utilities    $1,200  ████ 20%             │
│  │  Insurance      $900  ███ 15%              │
│  │  Other        $1,500  █████ 25%            │
│  └────────────────────┘                        │
└─────────────────────────────────────────────────┘
```

#### 4. 📥 Import Transactions
```
┌─────────────────────────────────────────────────┐
│  📥 Import Transactions                         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Drag & Drop CSV File Here              │   │
│  │  or [Browse Files]                      │   │
│  │                                         │   │
│  │  Supported: Chase, BoA, Wells Fargo     │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  📋 Preview & Categorize                        │
│  ┌───────────────────────────────────────────┐ │
│  │ Date  | Desc        | Amount | Category  │ │
│  │ 03/15 | ACME RENTAL | 1600   | [Rent ▼] │ │
│  │ 03/12 | PLUMB CO    | -350   | [Rep. ▼] │ │
│  └───────────────────────────────────────────┘ │
│                                                 │
│  [Cancel]  [Import 24 Transactions]            │
└─────────────────────────────────────────────────┘
```

### Component Library

Using **shadcn/ui** components:
- Button, Input, Select, Textarea
- Table, Card, Dialog, Dropdown Menu
- Badge, Alert, Toast
- Calendar, Date Picker
- Command (⌘K menu for quick actions)

---

## 📚 Documentation Plan

### 1. Technical Documentation

#### `README.md`
- Project overview
- Quick start guide
- Environment setup
- Running locally

#### `docs/API.md`
API endpoint documentation:
```
POST   /api/transactions          Create transaction
GET    /api/transactions          List transactions (paginated, filtered)
GET    /api/transactions/:id      Get transaction details
PUT    /api/transactions/:id      Update transaction
DELETE /api/transactions/:id      Delete transaction

POST   /api/transactions/import   Import CSV
GET    /api/categories            List categories
POST   /api/categories            Create category

GET    /api/analytics/summary     Dashboard stats
GET    /api/analytics/trends      Monthly trends
GET    /api/analytics/breakdown   Category breakdown

POST   /api/export/csv            Export transactions as CSV
GET    /api/export/tax-report     Generate tax report
```

#### `docs/DATABASE.md`
- Schema documentation
- Migration guide
- Backup procedures
- Data retention policy

#### `docs/DEPLOYMENT.md`
- Production deployment steps
- Environment variables
- Database migrations in prod
- Monitoring setup

### 2. User Documentation

#### `docs/USER_GUIDE.md`
- How to import transactions
- Categorization best practices
- Reading reports
- Tax preparation workflow

#### `docs/TAX_GUIDE.md`
- IRS Schedule E category mapping
- Repair vs. Improvement guidelines
- What to keep for records
- Year-end checklist

### 3. Development Documentation

#### `docs/ADR/` (Architecture Decision Records)
Example ADRs:
- `001-why-postgresql-over-mongodb.md`
- `002-prisma-vs-typeorm.md`
- `003-csv-import-strategy.md`

#### `CONTRIBUTING.md`
- Code style guide
- Git workflow
- Testing requirements
- Pull request template

---

## 🚀 Build Phases

### Phase 1: Foundation (Week 1-2)
**Goal:** Manual transaction entry working end-to-end

#### Backend Tasks
- [ ] Initialize Node.js project with TypeScript
- [ ] Set up PostgreSQL database
- [ ] Define Prisma schema
- [ ] Create initial migration
- [ ] Build Transaction CRUD API
- [ ] Build Category API
- [ ] Seed default categories
- [ ] Add input validation (Zod)
- [ ] Write basic API tests

#### Frontend Tasks
- [ ] Initialize Next.js project
- [ ] Set up Tailwind + shadcn/ui
- [ ] Create layout and navigation
- [ ] Build transaction entry form
- [ ] Create transaction list view
- [ ] Implement category selector
- [ ] Add client-side validation

**Deliverable:** Can manually add/edit/delete transactions with categories

---

### Phase 2: CSV Import & Auto-Categorization (Week 3)
**Goal:** Import bank statements and auto-categorize

#### Backend Tasks
- [ ] Build CSV parser (support multiple bank formats)
- [ ] Create import endpoint with preview
- [ ] Implement categorization rule engine
- [ ] Add deduplication logic (prevent double imports)
- [ ] Build categorization rule CRUD API
- [ ] Create bulk transaction operations

#### Frontend Tasks
- [ ] Build CSV upload component (drag & drop)
- [ ] Create import preview table
- [ ] Add bulk categorization UI
- [ ] Build categorization rules management page
- [ ] Add import history view

**Deliverable:** Can upload bank CSV, preview, auto-categorize, and import transactions

---

### Phase 3: Analytics & Reporting (Week 4)
**Goal:** Visualize financial data and export reports

#### Backend Tasks
- [ ] Create analytics endpoints (summary, trends, breakdown)
- [ ] Build CSV export functionality
- [ ] Create tax report generator (Schedule E format)
- [ ] Add date range filtering
- [ ] Implement property-level filtering

#### Frontend Tasks
- [ ] Build dashboard with key metrics
- [ ] Create charts (monthly trends, category breakdown)
- [ ] Build ledger view with filtering/sorting
- [ ] Add export buttons (CSV, PDF)
- [ ] Create tax report page

**Deliverable:** Complete analytics dashboard and export functionality

---

### Phase 4: Bank Integration (Week 5+)
**Goal:** Automatic transaction sync via Plaid

#### Backend Tasks
- [ ] Set up Plaid account and sandbox
- [ ] Integrate Plaid Link (OAuth flow)
- [ ] Build bank account connection API
- [ ] Create automated sync job (daily)
- [ ] Implement sync conflict resolution
- [ ] Add sync status tracking
- [ ] Handle Plaid webhooks

#### Frontend Tasks
- [ ] Integrate Plaid Link button
- [ ] Build bank account management page
- [ ] Add sync status indicators
- [ ] Create sync history view
- [ ] Handle connection errors

**Deliverable:** Fully automated bank transaction sync

---

### Phase 5: Polish & Optional Features (Ongoing)

#### Nice-to-Haves
- [ ] Receipt upload and OCR
- [ ] Tenant management portal
- [ ] Lease tracking and renewal reminders
- [ ] Multi-year comparison charts
- [ ] Email notifications (rent reminders, low balance)
- [ ] Mobile app (React Native)
- [ ] Advanced tax optimization suggestions
- [ ] AI-powered categorization improvements

---

## 🔗 Resources

### Documentation
- [Prisma Docs](https://www.prisma.io/docs) - ORM reference
- [Next.js Docs](https://nextjs.org/docs) - Frontend framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Plaid Docs](https://plaid.com/docs/) - Bank integration
- [IRS Schedule E](https://www.irs.gov/forms-pubs/about-schedule-e-form-1040) - Tax form reference

### Tools
- [Prisma Studio](https://www.prisma.io/studio) - Database GUI
- [Postman](https://www.postman.com/) - API testing
- [Excalidraw](https://excalidraw.com/) - Diagramming
- [Figma](https://www.figma.com/) - UI design (if needed)

### Learning Resources
- [Plaid Quickstart](https://github.com/plaid/quickstart) - Sample integration
- [shadcn Taxonomy](https://github.com/shadcn/taxonomy) - Example Next.js app
- [Prisma Examples](https://github.com/prisma/prisma-examples) - Sample projects

### Banking CSV Formats
Common bank CSV column mappings to document:
- **Chase:** Date, Description, Amount, Type, Balance
- **Bank of America:** Posted Date, Reference Number, Payee, Address, Amount
- **Wells Fargo:** Date, Amount, *, *, Name, Memo

---

## 📝 Notes

### Tax Considerations
- Keep records for **7 years** (IRS requirement)
- Distinguish **repairs** (deductible immediately) from **improvements** (depreciate over time)
- Track **mileage** for property-related travel
- Save all **receipts** over $75

### Future Monetization Ideas
If this solves your problem well, consider:
1. **SaaS for small landlords** - $15-30/month
2. **White-label solution** for property managers
3. **API access** for accountants/bookkeepers
4. **Premium features** - AI categorization, predictive analytics

### Security Checklist
- [ ] Encrypt sensitive data at rest (Plaid tokens, SSNs if stored)
- [ ] Use HTTPS in production
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Sanitize all inputs
- [ ] Regular dependency updates
- [ ] Database backups (daily)

---

**Last Updated:** April 2, 2026  
**Version:** 1.0  
**Status:** Planning Phase