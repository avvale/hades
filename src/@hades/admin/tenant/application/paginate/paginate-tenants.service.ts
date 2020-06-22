import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { ITenantRepository } from './../../domain/tenant.repository';
import { AdminTenant } from './../../domain/tenant.entity';

@Injectable()
export class PaginateTenantsService
{
    constructor(
        private readonly repository: ITenantRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminTenant>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}