import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { DatabaseModule } from 'src/database/database.module';
import { tenantProviders } from './tenant.providers';
import { TenantRedisCacheRepository } from './repositories/cache/tenant-redis.repository';
import { RedisService } from 'src/config/redis';
import { ITenantRepository } from './repositories/interfaces/ITenantRepository';
import { TenantPostgresRepository } from './repositories/postgres/tenant-postgres.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [TenantController],
  providers: [
    ...tenantProviders, 
    TenantService, 
    RedisService, 
    TenantRedisCacheRepository, 
    {provide: ITenantRepository, useClass: TenantPostgresRepository}],
})
export class TenantModule {}
