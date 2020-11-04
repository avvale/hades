import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateFlowsQuery } from './paginate-flows.query';
import { PaginateFlowsService } from './paginate-flows.service';

@QueryHandler(PaginateFlowsQuery)
export class PaginateFlowsQueryHandler implements IQueryHandler<PaginateFlowsQuery>
{
    constructor(
        private readonly paginateFlowsService: PaginateFlowsService,
    ) {}

    async execute(query: PaginateFlowsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateFlowsService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}