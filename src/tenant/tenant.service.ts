import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { ITenantRepository } from './repositories/interfaces/ITenantRepository';
import { TenantRedisCacheRepository } from './repositories/cache/tenant-redis.repository';

@Injectable()
export class TenantService {

  constructor(
    private readonly tenantRedisCache: TenantRedisCacheRepository,
    private readonly tenantRepository: ITenantRepository
  ) {}

  create(createTenantDto: CreateTenantDto) {
    return 'This action adds a new tenant';
  }

  findAll() {
    return `This action returns all tenant`;
  }

  async getTenantCredentials(id: string) {
    const credentialsCache = await this.tenantRedisCache.findById(id)
    if(credentialsCache){
      console.log("CACHE");
      return credentialsCache.tenantCredentials
    }
    console.log("DB", id);
    const credentialsRepo = await this.tenantRepository.findById(id);
    if(!credentialsRepo){
      throw new InternalServerErrorException("Err");
    }
    console.log(credentialsRepo);
    const credentialsCacheSave = await this.tenantRedisCache.create(credentialsRepo)
    return credentialsCacheSave.tenantCredentials
  }

}
