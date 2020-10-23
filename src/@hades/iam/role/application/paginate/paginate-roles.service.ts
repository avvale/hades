import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IRoleRepository } from './../../domain/role.repository';
import { IamRole } from './../../domain/role.aggregate';

@Injectable()
export class PaginateRolesService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<IamRole>>
    {
        return await this.repository.paginate(queryStatement, constraint);
    }
}