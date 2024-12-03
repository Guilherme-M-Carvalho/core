import { Inject, Injectable } from "@nestjs/common";
import { RedisService } from "../../../config/redis";
import { Tenant } from "src/tenant/entities/tenant.entity";
import { ITenantRepository } from "../interfaces/ITenantRepository";
import { Repository } from "typeorm";

@Injectable()
export class TenantRedisCacheRepository implements ITenantRepository {
    constructor(
        private readonly redis: RedisService,
    ){}
   
    async findById(id: string): Promise<Tenant | null> {
        const key = `tenant:${id}:credentials`;
        const cachedCredentials = await this.redis.get(key);
        if (!cachedCredentials) {
          return null;
        }
        return JSON.parse(cachedCredentials);
    }

    async create(tenant: Partial<Tenant>): Promise<Partial<Tenant>> {
        const key = `tenant:${tenant.id}:credentials`;
        await this.redis.set(key, JSON.stringify(tenant), 'EX', 15);
        return tenant;
    }
}