import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Lease } from '../types/lease';

@Controller('leases')
export class LeasesController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async findAll(): Promise<Lease[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from<Lease>('leases')
      .select('*');

    if (error) throw error;
    return data ?? [];
  }
}
