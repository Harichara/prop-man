import { Database } from '../../types/supabase.types';

export type LeaseRow = Database['public']['Tables']['leases']['Row'];

export class LeaseDto {
  id: string;
  tenantName: string | null;
  startDate: string | null;
  endDate: string | null;
  rentAmount: number | null;

  constructor(row: LeaseRow) {
    this.id = row.id;
    this.tenantName = row.tenant_name ?? null;
    this.startDate = row.start_date ?? null;
    this.endDate = row.end_date ?? null;
    this.rentAmount = row.rent_amount ?? null;
  }
}
