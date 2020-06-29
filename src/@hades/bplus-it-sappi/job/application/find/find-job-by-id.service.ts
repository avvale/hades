import { Injectable } from '@nestjs/common';
import { IJobRepository } from './../../domain/job.repository';
import { BplusItSappiJob } from './../../domain/job.entity';
import { JobId } from './../../domain/value-objects';

@Injectable()
export class FindJobByIdService
{
    constructor(
        private readonly repository: IJobRepository
    ) {}

    public async main(id: JobId): Promise<BplusItSappiJob>
    {        
        return await this.repository.findById(id);
    }
}