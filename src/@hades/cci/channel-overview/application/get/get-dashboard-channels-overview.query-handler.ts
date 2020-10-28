import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { ChannelOverviewMapper } from './../../domain/channel-overview.mapper';
import { GetDashboardChannelsOverviewQuery } from './get-dashboard-channels-overview.query';
import { GetDashboardChannelsOverviewService } from './get-dashboard-channels-overview.service';

@QueryHandler(GetDashboardChannelsOverviewQuery)
export class GetDashboardChannelsOverviewQueryHandler implements IQueryHandler<GetDashboardChannelsOverviewQuery>
{
    private readonly mapper: ChannelOverviewMapper = new ChannelOverviewMapper();

    constructor(
        private readonly getDashboardChannelsOverviewService: GetDashboardChannelsOverviewService
    ) { }

    async execute(query: GetDashboardChannelsOverviewQuery): Promise<ChannelOverviewResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getDashboardChannelsOverviewService.main(query.tenantIds, query.systemIds));
    }
}