import { Controller, Get, Param } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UnitDto, UnitRow } from './dto/unit.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly supabase: SupabaseService) {}

  @Get()
  async findAll(): Promise<UnitDto[]> {
    const result = await this.supabase.getClient().from('units').select('*');

    if (result.error) throw result.error;
    return (result.data ?? []).map((row: UnitRow) => new UnitDto(row));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UnitDto | null> {
    const result = await this.supabase
      .getClient()
      .from('units')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (result.error) throw result.error;
    return result.data ? new UnitDto(result.data as UnitRow) : null;
  }
}
