import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { TenantDto, TenantRow } from './dto/tenant.dto';

@Injectable()
export class TenantsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(): Promise<TenantDto[]> {
    const result = await this.supabase.getClient().from('tenants').select('*');

    if (result.error) throw result.error;
    return (result.data ?? []).map((row: TenantRow) => new TenantDto(row));
  }

  async findOne(id: string): Promise<TenantDto | null> {
    const result = await this.supabase
      .getClient()
      .from('tenants')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (result.error) throw result.error;
    return result.data ? new TenantDto(result.data as TenantRow) : null;
  }
}
