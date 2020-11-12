import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateResourcesQuery } from './paginate-resources.query';
import { PaginateResourcesService } from './paginate-resources.service';

@QueryHandler(PaginateResourcesQuery)
export class PaginateResourcesQueryHandler implements IQueryHandler<PaginateResourcesQuery>
{
    constructor(
        private readonly paginateResourcesService: PaginateResourcesService,
    ) {}

    async execute(query: PaginateResourcesQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateResourcesService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}