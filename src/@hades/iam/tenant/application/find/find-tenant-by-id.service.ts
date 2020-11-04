import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';
import { TenantId } from './../../domain/value-objects';

@Injectable()
export class FindTenantByIdService
{
    constructor(
        private readonly repository: ITenantRepository,
    ) {}

    public async main(id: TenantId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamTenant>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}