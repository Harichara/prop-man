import { Database } from '../../types/supabase.types';

export type UnitRow = Database['public']['Tables']['units']['Row'];

export class UnitDto {
  id: string;
  propertyId: string | null;
  unitNumber: string;
  bedrooms: number | null;
  bathrooms: number | null;
  rentAmount: number | null;
  createdAt: string | null;

  constructor(row: UnitRow) {
    this.id = row.id;
    this.propertyId = row.property_id;
    this.unitNumber = row.unit_number;
    this.bedrooms = row.bedrooms;
    this.bathrooms = row.bathrooms;
    this.rentAmount = row.rent_amount;
    this.createdAt = row.created_at;
  }
}
