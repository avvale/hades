import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IRoleRepository } from './../../domain/role.repository';
import { BplusItSappiRole } from './../../domain/role.aggregate';

@Injectable()
export class PaginateRolesService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiRole>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}