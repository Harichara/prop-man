# Property Management Expense Tracker - Project Outline

## **PROBLEM**
**What problem are we solving?**
- Manual expense entry is inconsistent and creates gaps in financial records
- Difficult to track rent payments and property expenses in real-time
- Time-consuming to compile tax documentation at year-end
- No centralized view of property financial performance
- Risk of missing deductible expenses without automated tracking

---

## **USERS**
**Who is this for?**
- **Primary:** You (small-scale landlord, full-stack developer, managing 2 units)
- **Secondary considerations:** Future tenants (if you add payment features), accountant/tax preparer (export consumers)

---

## **FEATURES**
**What does MVP need?**

### Core Features:
1. **Bank transaction import** - Connect to bank accounts or upload CSV
2. **Transaction categorization** - Auto-categorize income (rent) and expenses (maintenance, utilities, insurance, repairs, etc.)
3. **Manual transaction entry** - Backup for cash payments or missing data
4. **Basic ledger view** - Chronological list of all transactions
5. **Tax category tagging** - IRS Schedule E categories (repairs vs improvements, etc.)
6. **Simple analytics dashboard** - Monthly income/expense, year-to-date totals, category breakdowns
7. **Export functionality** - CSV/PDF export for tax filing

### Nice-to-haves (post-MVP):
- Receipt attachment/OCR
- Tenant profiles and payment history
- Automated rent reminders
- Multi-year comparison reports

---

## **DATA**
**What are we storing?**

### Database Schema:
- **Transactions** - id, date, amount, description, category, tax_category, type (income/expense), source (bank/manual), raw_data
- **Categories** - id, name, type, tax_deductible, irs_schedule_e_line
- **Bank_Accounts** - id, institution, account_number (encrypted), last_sync, balance
- **Properties** - id, address, unit_number (for duplex tracking)
- **Tenants** - id, name, unit, lease_start, lease_end, monthly_rent
- **Categorization_Rules** - id, keyword/pattern, target_category (for automation)
- **Receipts/Documents** - id, transaction_id, file_path, upload_date

### Data Retention:
- Minimum 7 years for tax purposes
- Regular backups to cloud storage

---

## **TECH**
**What stack are we using?**

### Backend:
- **Runtime:** Node.js with Express or Python with FastAPI
- **Database:** PostgreSQL (relational data, good for financial queries)
- **Bank Integration:** Plaid API (or start with CSV parser)
- **Authentication:** JWT for API security

### Frontend:
- **Framework:** React or Next.js
- **State Management:** React Context or Zustand
- **UI Library:** Tailwind CSS + shadcn/ui or Material-UI
- **Charts:** Chart.js or Recharts
- **Table/Grid:** TanStack Table for ledger view

### Infrastructure:
- **Hosting:** Vercel/Netlify (frontend) + Railway/Render (backend)
- **File Storage:** AWS S3 or Cloudinary (for receipts)
- **Environment:** Docker for local development consistency

### Development:
- **Version Control:** Git/GitHub
- **API Documentation:** Swagger/OpenAPI
- **Testing:** Jest + React Testing Library

---

## **MONETIZE**
**How will this make money?**

### Current Plan:
- This is a personal tool - no immediate monetization needed
- Focus on solving your problem first

### Future Opportunities (if you expand):
- SaaS for other small landlords ($10-20/month)
- One-time purchase desktop app
- White-label for property management companies
- Premium features: AI categorization, predictive analytics, automated tax form generation

---

## **UI/UX**
**How should this look and feel?**

### Design Principles:
- **Clean and minimal** - Focus on data, not clutter
- **Quick entry** - Fast transaction categorization workflow
- **Dashboard-first** - Key metrics visible immediately
- **Mobile-friendly** - Check finances on the go

### Key Views:
1. **Dashboard** - Income/expense summary, recent transactions, alerts
2. **Ledger** - Filterable, sortable transaction table
3. **Analytics** - Charts showing trends, category breakdowns, YoY comparison
4. **Import** - Bank connection or CSV upload interface
5. **Settings** - Categories, rules, bank accounts, property details

### Color Coding:
- Green for income (rent)
- Red for expenses
- Neutral for transfers/adjustments

---

## **DOCUMENT**
**Docs & context**

### Documentation to Create:
1. **API Documentation** - Endpoint specs, request/response formats
2. **Database Schema** - ERD and migration history
3. **Setup Guide** - Local development environment setup
4. **User Guide** - How to categorize, import, export
5. **Tax Guide** - Mapping categories to Schedule E lines
6. **Architecture Decision Records (ADRs)** - Why certain tech choices were made

### Context for Future AI Help:
- Maintain a changelog of features and decisions
- Comment complex categorization logic
- Document bank API integration quirks
- Keep example CSV formats for testing

---

## **Recommended Build Phases**

### Phase 1 (Week 1-2): Database + Manual Entry
- Set up PostgreSQL schema
- Build transaction CRUD API
- Simple React form for manual entry

### Phase 2 (Week 3): CSV Import + Categorization
- CSV parser for bank statements
- Rule-based auto-categorization
- Category management UI

### Phase 3 (Week 4): Analytics Dashboard
- Basic charts and summaries
- Ledger view with filtering
- Export to CSV

### Phase 4 (Week 5+): Bank API Integration
- Plaid integration
- Automated sync scheduling
- Error handling and reconciliation