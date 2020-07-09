import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActionResponse } from './../../domain/action.response';
import { FindActionQuery } from './find-action.query';
import { FindActionService } from './find-action.service';

@QueryHandler(FindActionQuery)
export class FindActionQueryHandler implements IQueryHandler<FindActionQuery>
{
    constructor(
        private readonly findActionService: FindActionService
    ) { }

    async execute(query: FindActionQuery): Promise<ActionResponse>
    {
        const action = await this.findActionService.main(query.queryStatements);

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