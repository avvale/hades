import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IPermissionRepository } from './../../domain/permission.repository';
import { IamPermission } from './../../domain/permission.aggregate';

@Injectable()
export class GetPermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamPermission[]>
    {
        return await this.repository.get(queryStatement, constraint, cQMetadata);
    }
}