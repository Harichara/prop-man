import { Controller, Get, Param } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { TenantDto, TenantRow } from './dto/tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async findAll(): Promise<TenantDto[]> {
    const result = await this.supabase.getClient().from('tenants').select('*');

    if (result.error) throw result.error;
    return (result.data ?? []).map((row: TenantRow) => new TenantDto(row));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TenantDto | null> {
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
