import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.aggregate';

@Injectable()
export class GetJobsOverviewService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobOverview[]>
    {        
        return await this.repository.get(queryStatements);
    }
}