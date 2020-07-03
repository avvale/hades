import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateBoundedContextsQuery } from './paginate-bounded-contexts.query';
import { PaginateBoundedContextsService } from './paginate-bounded-contexts.service';

@QueryHandler(PaginateBoundedContextsQuery)
export class PaginateBoundedContextsQueryHandler implements IQueryHandler<PaginateBoundedContextsQuery>
{
    constructor(
        private readonly paginateBoundedContextsService: PaginateBoundedContextsService
    ) { }

    async execute(query: PaginateBoundedContextsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateBoundedContextsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}