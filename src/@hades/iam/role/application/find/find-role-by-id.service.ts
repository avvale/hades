import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IRoleRepository } from './../../domain/role.repository';
import { IamRole } from './../../domain/role.aggregate';
import { RoleId } from './../../domain/value-objects';

@Injectable()
export class FindRoleByIdService
{
    constructor(
        private readonly repository: IRoleRepository,
    ) {}

    public async main(id: RoleId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<IamRole>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}