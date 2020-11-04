import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindJobOverviewByIdService
{
    constructor(
        private readonly repository: IJobOverviewRepository,
    ) {}

    public async main(id: JobOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobOverview>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}