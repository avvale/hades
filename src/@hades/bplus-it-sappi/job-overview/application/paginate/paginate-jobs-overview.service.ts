import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.aggregate';

@Injectable()
export class PaginateJobsOverviewService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraints: QueryStatementInput[]): Promise<Pagination<BplusItSappiJobOverview>>
    {        
        return await this.repository.paginate(queryStatements, constraints);
    }
}