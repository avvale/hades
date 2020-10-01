import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { ITenantRepository } from './../../domain/tenant.repository';
import { IamTenant } from './../../domain/tenant.aggregate';

@Injectable()
export class FindTenantService
{
    constructor(
        private readonly repository: ITenantRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<IamTenant>
    {        
        return await this.repository.find(queryStatement);
    }
}