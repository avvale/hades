import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@hades/shared/domain/persistence/sql-statement/sql-statement';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { ChannelOverviewId } from './../../domain/value-objects';

@Injectable()
export class FindChannelOverviewByIdService
{
    constructor(
        private readonly repository: IChannelOverviewRepository,
    ) {}

    public async main(id: ChannelOverviewId, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<CciChannelOverview>
    {
        return await this.repository.findById(id, constraint, cQMetadata);
    }
}