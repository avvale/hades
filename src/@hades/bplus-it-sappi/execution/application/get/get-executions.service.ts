import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.entity';

@Injectable()
export class GetExecutionsService
{
    constructor(
        private readonly repository: IExecutionRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiExecution[]>
    {        
        return await this.repository.get(queryStatements);
    }
}