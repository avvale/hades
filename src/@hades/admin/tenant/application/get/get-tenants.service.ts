import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AdminTenant } from './../../domain/tenant.aggregate';

@Injectable()
export class GetTenantsService
{
    constructor(
        private readonly repository: ITenantRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<AdminTenant[]>
    {        
        return await this.repository.get(queryStatements);
    }
}