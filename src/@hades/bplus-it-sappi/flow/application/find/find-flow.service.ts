import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IFlowRepository } from './../../domain/flow.repository';
import { BplusItSappiFlow } from './../../domain/flow.aggregate';

@Injectable()
export class FindFlowService
{
    constructor(
        private readonly repository: IFlowRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiFlow>
    {        
        return await this.repository.find(queryStatements);
    }
}