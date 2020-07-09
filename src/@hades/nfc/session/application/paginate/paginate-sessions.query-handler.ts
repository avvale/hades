import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateSessionsQuery } from './paginate-sessions.query';
import { PaginateSessionsService } from './paginate-sessions.service';

@QueryHandler(PaginateSessionsQuery)
export class PaginateSessionsQueryHandler implements IQueryHandler<PaginateSessionsQuery>
{
    constructor(
        private readonly paginateSessionsService: PaginateSessionsService
    ) { }

    async execute(query: PaginateSessionsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateSessionsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}