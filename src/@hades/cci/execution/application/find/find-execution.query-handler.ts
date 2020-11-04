import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExecutionResponse } from './../../domain/execution.response';
import { ExecutionMapper } from './../../domain/execution.mapper';
import { FindExecutionQuery } from './find-execution.query';
import { FindExecutionService } from './find-execution.service';

@QueryHandler(FindExecutionQuery)
export class FindExecutionQueryHandler implements IQueryHandler<FindExecutionQuery>
{
    private readonly mapper: ExecutionMapper = new ExecutionMapper();

    constructor(
        private readonly findExecutionService: FindExecutionService,
    ) {}

    async execute(query: FindExecutionQuery): Promise<ExecutionResponse>
    {
        const execution = await this.findExecutionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(execution);
    }
}