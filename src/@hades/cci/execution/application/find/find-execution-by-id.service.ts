import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { QueryMetadata } from '@hades/shared/domain/lib/hades.types';
import { IExecutionRepository } from './../../domain/execution.repository';
import { CciExecution } from './../../domain/execution.aggregate';
import { ExecutionId } from './../../domain/value-objects';

@Injectable()
export class FindExecutionByIdService
{
    constructor(
        private readonly repository: IExecutionRepository,
    ) {}

    public async main(id: ExecutionId, constraint?: QueryStatement, queryMetadata?: QueryMetadata): Promise<CciExecution>
    {
        return await this.repository.findById(id, constraint, queryMetadata);
    }
}