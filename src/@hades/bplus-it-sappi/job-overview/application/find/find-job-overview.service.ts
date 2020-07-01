import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';

@Injectable()
export class FindJobOverviewService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobOverview>
    {        
        return await this.repository.find(queryStatements);
    }
}