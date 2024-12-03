import { Tenant } from "src/tenant/entities/tenant.entity";

export abstract class ITenantRepository {
    abstract create(user: Partial<Tenant>): Promise<Partial<Tenant>>;
    abstract findById(id: string): Promise<Tenant | null>;
  }