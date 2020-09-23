import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IPermissionRepository } from './../../domain/permission.repository';
import { IamPermission } from './../../domain/permission.aggregate';

@Injectable()
export class GetPermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<IamPermission[]>
    {        
        return await this.repository.get(queryStatement);
    }
}