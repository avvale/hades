import { Injectable } from '@nestjs/common';
import { IFlowRepository } from './../../domain/flow.repository';
import { CciFlow } from './../../domain/flow.aggregate';
import { FlowId } from './../../domain/value-objects';

@Injectable()
export class FindFlowByIdService
{
    constructor(
        private readonly repository: IFlowRepository
    ) {}

    public async main(id: FlowId): Promise<CciFlow>
    {        
        return await this.repository.findById(id);
    }
}