import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { CciJobDetail } from './../../domain/job-detail.aggregate';

@Injectable()
export class FindJobDetailService
{
    constructor(
        private readonly repository: IJobDetailRepository,
    ) {}

    public async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobDetail>
    {
        return await this.repository.find(queryStatement, constraint, cQMetadata);
    }
}