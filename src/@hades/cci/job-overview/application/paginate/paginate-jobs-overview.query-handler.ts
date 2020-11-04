import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateJobsOverviewQuery } from './paginate-jobs-overview.query';
import { PaginateJobsOverviewService } from './paginate-jobs-overview.service';

@QueryHandler(PaginateJobsOverviewQuery)
export class PaginateJobsOverviewQueryHandler implements IQueryHandler<PaginateJobsOverviewQuery>
{
    constructor(
        private readonly paginateJobsOverviewService: PaginateJobsOverviewService,
    ) {}

    async execute(query: PaginateJobsOverviewQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateJobsOverviewService.main(query.queryStatement, query.constraint, query.cQMetadata);

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO())
        );
    }
}