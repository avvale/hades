import { Injectable } from '@nestjs/common';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AdminTenant } from './../../domain/tenant.entity';
import { TenantId } from './../../domain/value-objects';

@Injectable()
export class FindTenantByIdService
{
    constructor(
        private readonly repository: ITenantRepository
    ) {}

    public async main(id: TenantId): Promise<AdminTenant>
    {        
        return await this.repository.findById(id);
    }
}