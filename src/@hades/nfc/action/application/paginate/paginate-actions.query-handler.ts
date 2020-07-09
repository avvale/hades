import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateActionsQuery } from './paginate-actions.query';
import { PaginateActionsService } from './paginate-actions.service';

@QueryHandler(PaginateActionsQuery)
export class PaginateActionsQueryHandler implements IQueryHandler<PaginateActionsQuery>
{
    constructor(
        private readonly paginateActionsService: PaginateActionsService
    ) { }

    async execute(query: PaginateActionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateActionsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}