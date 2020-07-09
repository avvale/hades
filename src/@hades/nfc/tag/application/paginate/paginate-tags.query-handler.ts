import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateTagsQuery } from './paginate-tags.query';
import { PaginateTagsService } from './paginate-tags.service';

@QueryHandler(PaginateTagsQuery)
export class PaginateTagsQueryHandler implements IQueryHandler<PaginateTagsQuery>
{
    constructor(
        private readonly paginateTagsService: PaginateTagsService
    ) { }

    async execute(query: PaginateTagsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateTagsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}