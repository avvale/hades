import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';

@Injectable()
export class PaginateJobsOverviewService
{
    constructor(
        private readonly repository: IJobOverviewRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<CciJobOverview>>
    {
        return await this.repository.paginate(queryStatement, constraint, cQMetadata);
    }
}