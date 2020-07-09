import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActionResponse } from './../../domain/action.response';
import { GetActionsQuery } from './get-actions.query';
import { GetActionsService } from './get-actions.service';

@QueryHandler(GetActionsQuery)
export class GetActionsQueryHandler implements IQueryHandler<GetActionsQuery>
{
    constructor(
        private readonly getActionsService: GetActionsService
    ) { }

    async execute(query: GetActionsQuery): Promise<ActionResponse[]>
    {
        return (await this.getActionsService.main(query.queryStatements)).map(action => new ActionResponse(
                action.id.value,
                action.tagId.value,
                action.type.value,
                action.sectionId.value,
                action.data.value,
                action.createdAt.value,
                action.updatedAt.value,
                action.deletedAt.value,
                
            ));
    }
}