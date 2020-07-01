import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.entity';

@Injectable()
export class FindChannelOverviewService
{
    constructor(
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[]): Promise<BplusItSappiChannelOverview>
    {        
        return await this.repository.find(queryStatements);
    }
}