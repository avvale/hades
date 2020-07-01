import { Injectable } from '@nestjs/common';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { BplusItSappiJobOverview } from './../../domain/job-overview.entity';
import { JobOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindJobOverviewByIdService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(id: JobOverviewId): Promise<BplusItSappiJobOverview>
    {        
        return await this.repository.findById(id);
    }
}