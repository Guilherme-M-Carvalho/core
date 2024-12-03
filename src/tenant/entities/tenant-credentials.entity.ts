import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity'; // Importando a entidade Tenant

@Entity('tenant_credentials')
export class TenantCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  host: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  user: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @OneToOne(() => Tenant, (tenant) => tenant.tenantCredentials)
  tenant: Tenant;
}
