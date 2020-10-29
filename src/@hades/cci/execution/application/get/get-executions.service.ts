import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IExecutionRepository } from './../../domain/execution.repository';
import { CciExecution } from './../../domain/execution.aggregate';

@Injectable()
export class GetExecutionsService
{
    constructor(
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciExecution[]>
    {
        return await this.repository.get(queryStatement);
    }
}