import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IFlowRepository } from './../../domain/flow.repository';
import { CciFlow } from './../../domain/flow.aggregate';
import { FlowId } from './../../domain/value-objects';

@Injectable()
export class FindFlowByIdService
{
    constructor(
        private readonly repository: IFlowRepository,
    ) {}

    public async main(id: FlowId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciFlow>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}