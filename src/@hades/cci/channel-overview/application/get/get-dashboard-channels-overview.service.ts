import { Injectable } from '@nestjs/common';
import { CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { IChannelOverviewRepository } from './../../domain/channel-overview.repository';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';

@Injectable()
export class GetDashboardChannelsOverviewService
{
    constructor(
        private readonly repository: IChannelOverviewRepository
    ) {}

    public async main(tenantIds: string[], systemIds: string[], cQMetadata?: CQMetadata): Promise<CciChannelOverview[]>
    {
        return await this.repository.getDashboardData(tenantIds, systemIds, cQMetadata);
    }
}