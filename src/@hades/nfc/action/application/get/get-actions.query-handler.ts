import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ActionResponse } from './../../domain/action.response';
import { ActionMapper } from './../../domain/action.mapper';
import { GetActionsQuery } from './get-actions.query';
import { GetActionsService } from './get-actions.service';

@QueryHandler(GetActionsQuery)
export class GetActionsQueryHandler implements IQueryHandler<GetActionsQuery>
{
    private readonly mapper: ActionMapper = new ActionMapper();

    constructor(
        private readonly getActionsService: GetActionsService
    ) { }

    async execute(query: GetActionsQuery): Promise<ActionResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getActionsService.main(query.queryStatements));
    }
}