import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@hades/shared/domain/lib/pagination.response';
import { PaginateJobsDetailQuery } from './paginate-jobs-detail.query';
import { PaginateJobsDetailService } from './paginate-jobs-detail.service';

@QueryHandler(PaginateJobsDetailQuery)
export class PaginateJobsDetailQueryHandler implements IQueryHandler<PaginateJobsDetailQuery>
{
    constructor(
        private readonly paginateJobsDetailService: PaginateJobsDetailService
    ) { }

    async execute(query: PaginateJobsDetailQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateJobsDetailService.main(query.queryStatements, query.constraint)

        return new PaginationResponse(
            total, 
            count, 
            rows.map(item => item.toDTO())
        );
    }
}