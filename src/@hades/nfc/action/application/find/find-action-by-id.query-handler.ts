import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActionResponse } from './../../domain/action.response';
import { ActionMapper } from './../../domain/action.mapper';
import { ActionId } from './../../domain/value-objects';
import { FindActionByIdQuery } from './find-action-by-id.query';
import { FindActionByIdService } from './find-action-by-id.service';

@QueryHandler(FindActionByIdQuery)
export class FindActionByIdQueryHandler implements IQueryHandler<FindActionByIdQuery>
{
    private readonly mapper: ActionMapper = new ActionMapper();

    constructor(
        private readonly findActionByIdService: FindActionByIdService
    ) { }

    async execute(query: FindActionByIdQuery): Promise<ActionResponse>
    {
        const action = await this.findActionByIdService.main(new ActionId(query.id));

        return this.mapper.mapAggregateToResponse(action);
    }
}