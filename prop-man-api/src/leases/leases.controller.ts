import { Controller, Get, Param } from '@nestjs/common';
import { LeasesService } from './leases.service';
import { LeaseDto } from './dto/lease.dto';

@Controller('leases')
export class LeasesController {
  constructor(private readonly leasesService: LeasesService) {}

  @Get()
  async findAll(): Promise<LeaseDto[]> {
    return this.leasesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeaseDto | null> {
    return this.leasesService.findOne(id);
  }
}
