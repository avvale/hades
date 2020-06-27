import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExecutionResponse } from './../../domain/execution.response';
import { FindExecutionQuery } from './find-execution.query';
import { FindExecutionService } from './find-execution.service';

@QueryHandler(FindExecutionQuery)
export class FindExecutionQueryHandler implements IQueryHandler<FindExecutionQuery>
{
    constructor(
        private readonly findExecutionService: FindExecutionService
    ) { }

    async execute(query: FindExecutionQuery): Promise<ExecutionResponse>
    {
        const execution = await this.findExecutionService.main(query.queryStatements);

        return new ExecutionResponse(
                execution.id.value,
                execution.tenantId.value,
                execution.systemId.value,
                execution.type.value,
                execution.monitoringStartAt.value,
                execution.monitoringEndAt.value,
                execution.executedAt.value,
                execution.createdAt.value,
                execution.updatedAt.value,
                execution.deletedAt.value,
                
            );
    }
}