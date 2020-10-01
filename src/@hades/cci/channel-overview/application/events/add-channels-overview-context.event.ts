import { AggregateRoot } from '@nestjs/cqrs';
import { CciChannelOverview } from './../../domain/channel-overview.aggregate';
import { CreatedChannelOverviewEvent } from './created-channel-overview.event';
import { DeletedChannelOverviewEvent } from './deleted-channel-overview.event';
import { CreatedChannelsOverviewEvent } from './created-channels-overview.event';
import { DeletedChannelsOverviewEvent } from './deleted-channels-overview.event';

export class AddChannelsOverviewContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: CciChannelOverview[] = []
    ) {
        super();
    }

    *[Symbol.iterator]()
    { 
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot; 
    }

    created()
    {
        this.apply(
            new CreatedChannelsOverviewEvent(
                this.aggregateRoots.map(channelOverview => 
                    new CreatedChannelOverviewEvent(
                        channelOverview.id.value,
                        channelOverview.tenantId.value,
                        channelOverview.tenantCode.value,
                        channelOverview.systemId.value,
                        channelOverview.systemName.value,
                        channelOverview.executionId.value,
                        channelOverview.executionType.value,
                        channelOverview.executionExecutedAt.value,
                        channelOverview.executionMonitoringStartAt.value,
                        channelOverview.executionMonitoringEndAt.value,
                        channelOverview.error?.value,
                        channelOverview.inactive?.value,
                        channelOverview.successful?.value,
                        channelOverview.stopped?.value,
                        channelOverview.unknown?.value,
                        channelOverview.unregistered?.value,
                        channelOverview.createdAt?.value,
                        channelOverview.updatedAt?.value,
                        channelOverview.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedChannelsOverviewEvent(
                this.aggregateRoots.map(channelOverview => 
                    new DeletedChannelOverviewEvent(
                        channelOverview.id.value,
                        channelOverview.tenantId.value,
                        channelOverview.tenantCode.value,
                        channelOverview.systemId.value,
                        channelOverview.systemName.value,
                        channelOverview.executionId.value,
                        channelOverview.executionType.value,
                        channelOverview.executionExecutedAt.value,
                        channelOverview.executionMonitoringStartAt.value,
                        channelOverview.executionMonitoringEndAt.value,
                        channelOverview.error?.value,
                        channelOverview.inactive?.value,
                        channelOverview.successful?.value,
                        channelOverview.stopped?.value,
                        channelOverview.unknown?.value,
                        channelOverview.unregistered?.value,
                        channelOverview.createdAt?.value,
                        channelOverview.updatedAt?.value,
                        channelOverview.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}