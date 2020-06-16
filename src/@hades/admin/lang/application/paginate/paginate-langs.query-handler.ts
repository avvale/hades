import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationLangsResponse } from './../../domain/pagination-langs.response';
import { PaginateLangsQuery } from './paginate-langs.query';
import { PaginateLangsService } from './paginate-langs.service';

@QueryHandler(PaginateLangsQuery)
export class PaginateLangsQueryHandler implements IQueryHandler<PaginateLangsQuery>
{
    constructor(
        private readonly paginateLangsService: PaginateLangsService
    ) { }

    async execute(query: PaginateLangsQuery): Promise<PaginationLangsResponse>
    {
        const { total, count, rows } = await this.paginateLangsService.main(query.queryStatements, query.constraint)

        return new PaginationLangsResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}