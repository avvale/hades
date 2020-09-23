import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IPermissionRepository } from './../../domain/permission.repository';
import { IamPermission } from './../../domain/permission.aggregate';

@Injectable()
export class PaginatePermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<IamPermission>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}