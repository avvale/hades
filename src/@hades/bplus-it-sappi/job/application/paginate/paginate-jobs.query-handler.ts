import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateJobsQuery } from './paginate-jobs.query';
import { PaginateJobsService } from './paginate-jobs.service';

@QueryHandler(PaginateJobsQuery)
export class PaginateJobsQueryHandler implements IQueryHandler<PaginateJobsQuery>
{
    constructor(
        private readonly paginateJobsService: PaginateJobsService
    ) { }

    async execute(query: PaginateJobsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateJobsService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}