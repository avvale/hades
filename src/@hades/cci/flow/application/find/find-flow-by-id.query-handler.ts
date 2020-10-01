import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FlowResponse } from './../../domain/flow.response';
import { FlowMapper } from './../../domain/flow.mapper';
import { FlowId } from './../../domain/value-objects';
import { FindFlowByIdQuery } from './find-flow-by-id.query';
import { FindFlowByIdService } from './find-flow-by-id.service';

@QueryHandler(FindFlowByIdQuery)
export class FindFlowByIdQueryHandler implements IQueryHandler<FindFlowByIdQuery>
{
    private readonly mapper: FlowMapper = new FlowMapper();

    constructor(
        private readonly findFlowByIdService: FindFlowByIdService
    ) { }

    async execute(query: FindFlowByIdQuery): Promise<FlowResponse>
    {
        const flow = await this.findFlowByIdService.main(new FlowId(query.id));

        return this.mapper.mapAggregateToResponse(flow);
    }
}