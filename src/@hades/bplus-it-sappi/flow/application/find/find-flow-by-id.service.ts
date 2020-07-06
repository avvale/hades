import { Injectable } from '@nestjs/common';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';
import { FlowId } from './../../domain/value-objects';

@Injectable()
export class FindFlowByIdService
{
    constructor(
        private readonly repository: IFlowRepository
    ) {}

    public async main(id: FlowId): Promise<BplusItSappiFlow>
    {        
        return await this.repository.findById(id);
    }
}