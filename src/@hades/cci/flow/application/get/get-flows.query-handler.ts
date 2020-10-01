import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FlowResponse } from './../../domain/flow.response';
import { FlowMapper } from './../../domain/flow.mapper';
import { GetFlowsQuery } from './get-flows.query';
import { GetFlowsService } from './get-flows.service';

@QueryHandler(GetFlowsQuery)
export class GetFlowsQueryHandler implements IQueryHandler<GetFlowsQuery>
{
    private readonly mapper: FlowMapper = new FlowMapper();

    constructor(
        private readonly getFlowsService: GetFlowsService
    ) { }

    async execute(query: GetFlowsQuery): Promise<FlowResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getFlowsService.main(query.queryStatement));
    }
}