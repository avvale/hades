import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IMessageOverviewRepository } from './../../domain/message-overview.repository';
import { BplusItSappiMessageOverview } from './../../domain/message-overview.entity';

@Injectable()
export class FindMessageOverviewService
{
    constructor(
        private readonly repository: IMessageOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiMessageOverview>
    {        
        return await this.repository.find(queryStatements);
    }
}