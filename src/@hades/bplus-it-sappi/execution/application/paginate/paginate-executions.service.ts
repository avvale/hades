import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';

@Injectable()
export class PaginateExecutionsService
{
    constructor(
        private readonly repository: IExecutionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiExecution>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}