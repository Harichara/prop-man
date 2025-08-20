import { Controller, Get, Param } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { LeaseDto, LeaseRow } from './dto/lease.dto';

@Controller('leases')
export class LeasesController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async findAll(): Promise<LeaseDto[]> {
    const result = await this.supabase.getClient().from('leases').select('*');

    if (result.error) throw result.error;
    return (result.data ?? []).map((row: LeaseRow) => new LeaseDto(row));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeaseDto | null> {
    const result = await this.supabase
      .getClient()
      .from('leases')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (result.error) throw result.error;
    return result.data ? new LeaseDto(result.data as LeaseRow) : null;
  }
}
