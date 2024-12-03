import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from '../../entities/tenant.entity';
import { ITenantRepository } from '../interfaces/ITenantRepository';

@Injectable()
export class TenantPostgresRepository implements ITenantRepository {
  constructor(
    @Inject('TENANT_REPOSITORY')
    private tenantRepository: Repository<Tenant>,
  ) {}

  async create(tenantData: Partial<Tenant>): Promise<Tenant> {
    const tenant = this.tenantRepository.create(tenantData);
    return await this.tenantRepository.save(tenant);
  }

  async findById(id: string): Promise<Tenant | null> {
    return await this.tenantRepository.findOne({where: {id: id}, relations: { tenantCredentials: true }});
  }

  async findAll(): Promise<Tenant[]> {
    return await this.tenantRepository.find();
  }
}
