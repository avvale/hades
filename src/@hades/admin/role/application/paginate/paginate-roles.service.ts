import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IRoleRepository } from './../../domain/role.repository';
import { AdminRole } from './../../domain/role.aggregate';

@Injectable()
export class PaginateRolesService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<AdminRole>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}