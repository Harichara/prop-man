import { Database } from '../../types/supabase.types';

export type LeaseRow = Database['public']['Tables']['leases']['Row'];

export class LeaseDto {
  id: string;
  tenantId: string | null;
  unitId: string | null;
  startDate: string;
  endDate: string | null;
  rentAmount: number;
  securityDeposit: number | null;
  isActive: boolean | null;
  createdAt: string | null;

  constructor(row: LeaseRow) {
    this.id = row.id;
    this.tenantId = row.tenant_id;
    this.unitId = row.unit_id;
    this.startDate = row.start_date;
    this.endDate = row.end_date;
    this.rentAmount = Number(row.rent_amount);
    this.securityDeposit = row.security_deposit;
    this.isActive = row.is_active;
    this.createdAt = row.created_at;
  }
}
