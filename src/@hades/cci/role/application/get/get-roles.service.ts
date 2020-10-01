import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IRoleRepository } from './../../domain/role.repository';
import { CciRole } from './../../domain/role.aggregate';

@Injectable()
export class GetRolesService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciRole[]>
    {        
        return await this.repository.get(queryStatement);
    }
}