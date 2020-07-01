import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IPermissionRepository } from './../../domain/permission.repository';
import { AdminPermission } from './../../domain/permission.entity';

@Injectable()
export class GetPermissionsService
{
    constructor(
        private readonly repository: IPermissionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<AdminPermission[]>
    {        
        return await this.repository.get(queryStatements);
    }
}