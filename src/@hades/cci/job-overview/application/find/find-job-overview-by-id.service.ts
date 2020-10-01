import { Injectable } from '@nestjs/common';
import { IJobOverviewRepository } from './../../domain/job-overview.repository';
import { CciJobOverview } from './../../domain/job-overview.aggregate';
import { JobOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindJobOverviewByIdService
{
    constructor(
        private readonly repository: IJobOverviewRepository
    ) {}

    public async main(id: JobOverviewId): Promise<CciJobOverview>
    {        
        return await this.repository.findById(id);
    }
}