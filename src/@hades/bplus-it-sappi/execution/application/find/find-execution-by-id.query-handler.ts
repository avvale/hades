import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExecutionResponse } from './../../domain/execution.response';
import { ExecutionId } from './../../domain/value-objects';
import { FindExecutionByIdQuery } from './find-execution-by-id.query';
import { FindExecutionByIdService } from './find-execution-by-id.service';

@QueryHandler(FindExecutionByIdQuery)
export class FindExecutionByIdQueryHandler implements IQueryHandler<FindExecutionByIdQuery>
{
    constructor(
        private readonly findExecutionByIdService: FindExecutionByIdService
    ) { }

    async execute(query: FindExecutionByIdQuery): Promise<ExecutionResponse>
    {
        const execution = await this.findExecutionByIdService.main(new ExecutionId(query.id));

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