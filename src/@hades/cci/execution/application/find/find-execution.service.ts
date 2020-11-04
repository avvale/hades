import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IExecutionRepository } from './../../domain/execution.repository';
import { CciExecution } from './../../domain/execution.aggregate';

@Injectable()
export class FindExecutionService
{
    constructor(
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciExecution>
    {
        return await this.repository.find(queryStatement, constraint, cQMetadata);
    }
}