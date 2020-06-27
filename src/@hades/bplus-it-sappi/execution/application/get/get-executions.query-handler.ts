import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExecutionResponse } from './../../domain/execution.response';
import { GetExecutionsQuery } from './get-executions.query';
import { GetExecutionsService } from './get-executions.service';

@QueryHandler(GetExecutionsQuery)
export class GetExecutionsQueryHandler implements IQueryHandler<GetExecutionsQuery>
{
    constructor(
        private readonly getExecutionsService: GetExecutionsService
    ) { }

    async execute(query: GetExecutionsQuery): Promise<ExecutionResponse[]>
    {
        return (await this.getExecutionsService.main(query.queryStatements)).map(execution => new ExecutionResponse(
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
                
            ));
    }
}