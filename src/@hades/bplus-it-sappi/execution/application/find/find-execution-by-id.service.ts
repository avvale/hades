import { Injectable } from '@nestjs/common';
import { IExecutionRepository } from './../../domain/execution.repository';
import { BplusItSappiExecution } from './../../domain/execution.aggregate';
import { ExecutionId } from './../../domain/value-objects';

@Injectable()
export class FindExecutionByIdService
{
    constructor(
        private readonly repository: IExecutionRepository
    ) {}

    public async main(id: ExecutionId): Promise<BplusItSappiExecution>
    {        
        return await this.repository.findById(id);
    }
}