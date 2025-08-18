import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('leases')
export class LeasesController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from('leases')
      .select('*');

    if (error) throw error;
    return data;
  }
}
