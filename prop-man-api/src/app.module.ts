import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
import { LeasesController } from './leases/leases.controller';

@Module({
  imports: [],
  controllers: [AppController, LeasesController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
