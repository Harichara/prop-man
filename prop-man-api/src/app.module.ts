import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseService } from './supabase/supabase.service';
import { LeasesController } from './leases/leases.controller';
import { ConfigModule } from '@nestjs/config';
import { LeasesService } from './leases/leases.service';
import { LeasesModule } from './leases/leases.module';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { TenantsModule } from './tenants/tenants.module';
import { PropertiesController } from './properties/properties.controller';
import { PropertiesService } from './properties/properties.service';
import { PropertiesModule } from './properties/properties.module';

@Module({
  imports: [ConfigModule.forRoot(), LeasesModule, TenantsModule, PropertiesModule],
  controllers: [AppController, LeasesController, TenantsController, PropertiesController],
  providers: [AppService, SupabaseService, LeasesService, TenantsService, PropertiesService],
})
export class AppModule {}
