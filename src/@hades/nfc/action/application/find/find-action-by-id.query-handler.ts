import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActionResponse } from './../../domain/action.response';
import { ActionId } from './../../domain/value-objects';
import { FindActionByIdQuery } from './find-action-by-id.query';
import { FindActionByIdService } from './find-action-by-id.service';

@QueryHandler(FindActionByIdQuery)
export class FindActionByIdQueryHandler implements IQueryHandler<FindActionByIdQuery>
{
    constructor(
        private readonly findActionByIdService: FindActionByIdService
    ) { }

    async execute(query: FindActionByIdQuery): Promise<ActionResponse>
    {
        const action = await this.findActionByIdService.main(new ActionId(query.id));

        return new ActionResponse(
                action.id.value,
                action.tagId.value,
                action.type.value,
                action.sectionId.value,
                action.data.value,
                action.createdAt.value,
                action.updatedAt.value,
                action.deletedAt.value,
                
            );
    }
}