import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { GetChannelsOverviewQuery } from './get-channels-overview.query';
import { GetChannelsOverviewService } from './get-channels-overview.service';

@QueryHandler(GetChannelsOverviewQuery)
export class GetChannelsOverviewQueryHandler implements IQueryHandler<GetChannelsOverviewQuery>
{
    constructor(
        private readonly getChannelsOverviewService: GetChannelsOverviewService
    ) { }

    async execute(query: GetChannelsOverviewQuery): Promise<ChannelOverviewResponse[]>
    {
        return (await this.getChannelsOverviewService.main(query.queryStatements)).map(channelOverview => new ChannelOverviewResponse(
                channelOverview.id.value,
                channelOverview.tenantId.value,
                channelOverview.systemId.value,
                channelOverview.systemName.value,
                channelOverview.executionId.value,
                channelOverview.executionType.value,
                channelOverview.executionExecutedAt.value,
                channelOverview.executionMonitoringStartAt.value,
                channelOverview.executionMonitoringEndAt.value,
                channelOverview.error.value,
                channelOverview.inactive.value,
                channelOverview.successful.value,
                channelOverview.stopped.value,
                channelOverview.unknown.value,
                channelOverview.unregistered.value,
                channelOverview.createdAt.value,
                channelOverview.updatedAt.value,
                channelOverview.deletedAt.value,
                
            ));
    }
}