import { Injectable } from '@nestjs/common';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.aggregate';
import { JobDetailId } from './../../domain/value-objects';

@Injectable()
export class FindJobDetailByIdService
{
    constructor(
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(id: JobDetailId): Promise<BplusItSappiJobDetail>
    {        
        return await this.repository.findById(id);
    }
}