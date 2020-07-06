import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IModuleRepository } from './../../domain/module.repository';
import { BplusItSappiModule } from './../../domain/module.aggregate';

@Injectable()
export class PaginateModulesService
{
    constructor(
        private readonly repository: IModuleRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiModule>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}