import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { CciJobDetail } from './../../domain/job-detail.aggregate';

@Injectable()
export class GetJobsDetailService
{
    constructor(
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciJobDetail[]>
    {        
        return await this.repository.get(queryStatement);
    }
}