import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { CciJobDetail } from './../../domain/job-detail.aggregate';
import { JobDetailId } from './../../domain/value-objects';

@Injectable()
export class FindJobDetailByIdService
{
    constructor(
        private readonly repository: IJobDetailRepository,
    ) {}

    public async main(id: JobDetailId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciJobDetail>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}