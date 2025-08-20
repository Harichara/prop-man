import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { UnitDto, UnitRow } from './dto/unit.dto';

@Injectable()
export class UnitsService {
  constructor(private readonly supabase: SupabaseService) {}

  async findAll(): Promise<UnitDto[]> {
    const result = await this.supabase.getClient().from('units').select('*');

    if (result.error) throw result.error;
    return (result.data ?? []).map((row: UnitRow) => new UnitDto(row));
  }

  async findOne(id: string): Promise<UnitDto | null> {
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
