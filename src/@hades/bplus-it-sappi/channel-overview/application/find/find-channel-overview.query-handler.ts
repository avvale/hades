import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { FindChannelOverviewQuery } from './find-channel-overview.query';
import { FindChannelOverviewService } from './find-channel-overview.service';

@QueryHandler(FindChannelOverviewQuery)
export class FindChannelOverviewQueryHandler implements IQueryHandler<FindChannelOverviewQuery>
{
    constructor(
        private readonly findChannelOverviewService: FindChannelOverviewService
    ) { }

    async execute(query: FindChannelOverviewQuery): Promise<ChannelOverviewResponse>
    {
        const channelOverview = await this.findChannelOverviewService.main(query.queryStatements);

        return new ChannelOverviewResponse(
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
                
            );
    }
}