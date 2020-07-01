import { Injectable } from '@nestjs/common';
import { QueryStatementInput } from '@hades/shared/domain/persistence/sql-statement-input';
import { Pagination } from '@hades/shared/domain/lib/pagination';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { BplusItSappiChannelOverview } from './../../domain/channel-overview.entity';

@Injectable()
export class PaginateChannelsOverviewService
{
    constructor(
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(queryStatements: QueryStatementInput[], constraint: QueryStatementInput[]): Promise<Pagination<BplusItSappiChannelOverview>>
    {        
        return await this.repository.paginate(queryStatements, constraint);
    }
}