import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ChannelOverviewResponse } from './../../domain/channel-overview.response';
import { ChannelOverviewId } from './../../domain/value-objects';
import { FindChannelOverviewByIdQuery } from './find-channel-overview-by-id.query';
import { FindChannelOverviewByIdService } from './find-channel-overview-by-id.service';

@QueryHandler(FindChannelOverviewByIdQuery)
export class FindChannelOverviewByIdQueryHandler implements IQueryHandler<FindChannelOverviewByIdQuery>
{
    constructor(
        private readonly findChannelOverviewByIdService: FindChannelOverviewByIdService
    ) { }

    async execute(query: FindChannelOverviewByIdQuery): Promise<ChannelOverviewResponse>
    {
        const channelOverview = await this.findChannelOverviewByIdService.main(new ChannelOverviewId(query.id));

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