import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { IFlowRepository } from './../../domain/flow.repository';
import { CciFlow } from './../../domain/flow.aggregate';

@Injectable()
export class GetFlowsService
{
    constructor(
        private readonly repository: IFlowRepository
    ) {}

    public async main(queryStatement?: QueryStatement): Promise<CciFlow[]>
    {        
        return await this.repository.get(queryStatement);
    }
}