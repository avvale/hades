import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IJobRepository } from './../../domain/job.repository';
import { BplusItSappiJob } from './../../domain/job.entity';

@Injectable()
export class FindJobService
{
    constructor(
        private readonly repository: IJobRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiJob>
    {        
        return await this.repository.find(queryStatements);
    }
}