import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { TenantCredentials } from './tenant-credentials.entity';

@Entity('tenants')
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  // Relacionamento um-para-um com as credenciais do tenant
  @OneToOne(() => TenantCredentials, (tenantCredentials) => tenantCredentials.tenant, { cascade: true, eager: true })
  @JoinColumn()
  tenantCredentials: TenantCredentials;
}
