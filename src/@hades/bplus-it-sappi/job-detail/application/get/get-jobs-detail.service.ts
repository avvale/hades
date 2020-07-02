import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.entity';

@Injectable()
export class GetJobsDetailService
{
    constructor(
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiJobDetail[]>
    {        
        return await this.repository.get(queryStatements);
    }
}