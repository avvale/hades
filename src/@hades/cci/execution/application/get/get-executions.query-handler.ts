import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExecutionResponse } from './../../domain/execution.response';
import { ExecutionMapper } from './../../domain/execution.mapper';
import { GetExecutionsQuery } from './get-executions.query';
import { GetExecutionsService } from './get-executions.service';

@QueryHandler(GetExecutionsQuery)
export class GetExecutionsQueryHandler implements IQueryHandler<GetExecutionsQuery>
{
    private readonly mapper: ExecutionMapper = new ExecutionMapper();

    constructor(
        private readonly getExecutionsService: GetExecutionsService
    ) { }

    async execute(query: GetExecutionsQuery): Promise<ExecutionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getExecutionsService.main(query.queryStatement));
    }
}