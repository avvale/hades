import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { CciJobDetail } from './../../domain/job-detail.aggregate';

@Injectable()
export class PaginateJobsDetailService
{
    constructor(
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement): Promise<Pagination<CciJobDetail>>
    {        
        return await this.repository.paginate(queryStatement, constraint);
    }
}