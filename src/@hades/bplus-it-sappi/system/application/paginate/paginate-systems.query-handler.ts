import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateSystemsQuery } from './paginate-systems.query';
import { PaginateSystemsService } from './paginate-systems.service';

@QueryHandler(PaginateSystemsQuery)
export class PaginateSystemsQueryHandler implements IQueryHandler<PaginateSystemsQuery>
{
    constructor(
        private readonly paginateSystemsService: PaginateSystemsService
    ) { }

    async execute(query: PaginateSystemsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateSystemsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}