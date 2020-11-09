import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IPermissionRepository } from './../../domain/permission.repository';
import { IamPermission } from './../../domain/permission.aggregate';
import { PermissionId } from './../../domain/value-objects';

@Injectable()
export class FindPermissionByIdService
{
    constructor(
        private readonly repository: IPermissionRepository,
    ) {}

    public async main(id: PermissionId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamPermission>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}