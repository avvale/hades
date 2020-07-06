import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IRoleRepository } from './../../domain/role.repository';
import { BplusItSappiRole } from './../../domain/role.aggregate';

@Injectable()
export class GetRolesService
{
    constructor(
        private readonly repository: IRoleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiRole[]>
    {        
        return await this.repository.get(queryStatements);
    }
}