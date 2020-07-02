import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.entity';

@Injectable()
export class PaginateJobsDetailService
{
    constructor(
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiJobDetail>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}