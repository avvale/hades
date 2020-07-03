import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IPermissionRepository } from './../../domain/permission.repository';
import { AdminPermission } from './../../domain/permission.aggregate';

@Injectable()
export class PaginatePermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<AdminPermission>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}