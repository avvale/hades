import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActionResponse } from './../../domain/action.response';
import { ActionMapper } from './../../domain/action.mapper';
import { FindActionQuery } from './find-action.query';
import { FindActionService } from './find-action.service';

@QueryHandler(FindActionQuery)
export class FindActionQueryHandler implements IQueryHandler<FindActionQuery>
{
    private readonly mapper: ActionMapper = new ActionMapper();

    constructor(
        private readonly findActionService: FindActionService
    ) { }

    async execute(query: FindActionQuery): Promise<ActionResponse>
    {
        const action = await this.findActionService.main(query.queryStatements);

        return this.mapper.mapAggregateToResponse(action);
    }
}