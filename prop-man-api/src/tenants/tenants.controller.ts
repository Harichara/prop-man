import { Controller, Get, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantDto } from './dto/tenant.dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Get()
  async findAll(): Promise<TenantDto[]> {
    return this.tenantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TenantDto | null> {
    return this.tenantsService.findOne(id);
  }
}
