import { Database } from '../../types/supabase.types';

export type TenantRow = Database['public']['Tables']['tenants']['Row'];

export class TenantDto {
  id: string;
  fullName: string;
  email: string | null;
  phone: string | null;
  createdAt: string | null;

  constructor(row: TenantRow) {
    this.id = row.id;
    this.fullName = row.full_name;
    this.email = row.email;
    this.phone = row.phone;
    this.createdAt = row.created_at;
  }
}
