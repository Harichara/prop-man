import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase.types';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient<Database>;

  constructor() {
    this.client = createClient<Database>(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // ✅ service role key for backend
    );
  }

  getClient(): SupabaseClient<Database> {
    return this.client;
  }
}
