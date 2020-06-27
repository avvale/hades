import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.entity';

@Injectable()
export class FindExecutionService
{
    constructor(
        private readonly repository: IExecutionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiExecution>
    {        
        return await this.repository.find(queryStatements);
    }
}