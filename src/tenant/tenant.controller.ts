import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get(':tenantId/credentials')
  async getTenantCredentials(@Param('tenantId') tenantId: string) {
    return this.tenantService.getTenantCredentials(tenantId);
  }
}
