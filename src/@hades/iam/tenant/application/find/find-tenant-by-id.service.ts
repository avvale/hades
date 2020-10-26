import { Injectable } from '@nestjs/common';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';
import { TenantId } from './../../domain/value-objects';

@Injectable()
export class FindTenantByIdService
{
    constructor(
        private readonly repository: ITenantRepository
    ) {}

    public async main(id: TenantId): Promise<IamTenant>
    {
        return await this.repository.findById(id);
    }
}