import { Controller, Get, Param } from '@nestjs/common';
import { UnitsService } from './unit.service';
import { UnitDto } from './dto/unit.dto';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  async findAll(): Promise<UnitDto[]> {
    return this.unitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UnitDto | null> {
    return this.unitsService.findOne(id);
  }
}
