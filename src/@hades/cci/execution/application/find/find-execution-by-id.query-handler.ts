import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExecutionResponse } from './../../domain/execution.response';
import { ExecutionMapper } from './../../domain/execution.mapper';
import { ExecutionId } from './../../domain/value-objects';
import { FindExecutionByIdQuery } from './find-execution-by-id.query';
import { FindExecutionByIdService } from './find-execution-by-id.service';

@QueryHandler(FindExecutionByIdQuery)
export class FindExecutionByIdQueryHandler implements IQueryHandler<FindExecutionByIdQuery>
{
    private readonly mapper: ExecutionMapper = new ExecutionMapper();

    constructor(
        private readonly findExecutionByIdService: FindExecutionByIdService,
    ) {}

    async execute(query: FindExecutionByIdQuery): Promise<ExecutionResponse>
    {
        const execution = await this.findExecutionByIdService.main(
            new ExecutionId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(execution);
    }
}