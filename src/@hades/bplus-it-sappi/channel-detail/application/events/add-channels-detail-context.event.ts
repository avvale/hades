import { AggregateRoot } from '@nestjs/cqrs';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';
import { CreatedChannelDetailEvent } from './created-channel-detail.event';
import { DeletedChannelDetailEvent } from './deleted-channel-detail.event';
import { CreatedChannelsDetailEvent } from './created-channels-detail.event';
import { DeletedChannelsDetailEvent } from './deleted-channels-detail.event';

export class AddChannelsDetailContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: BplusItSappiChannelDetail[] = []
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
            new CreatedChannelsDetailEvent(
                this.aggregateRoots.map(channelDetail => 
                    new CreatedChannelDetailEvent(
                        channelDetail.id.value,
                        channelDetail.tenantId.value,
                        channelDetail.tenantCode.value,
                        channelDetail.systemId.value,
                        channelDetail.systemName.value,
                        channelDetail.executionId.value,
                        channelDetail.executionType.value,
                        channelDetail.executionExecutedAt.value,
                        channelDetail.executionMonitoringStartAt.value,
                        channelDetail.executionMonitoringEndAt.value,
                        channelDetail.status.value,
                        channelDetail.channelHash.value,
                        channelDetail.channelSapId.value,
                        channelDetail.channelParty?.value,
                        channelDetail.channelComponent.value,
                        channelDetail.channelName.value,
                        channelDetail.detail?.value,
                        channelDetail.createdAt?.value,
                        channelDetail.updatedAt?.value,
                        channelDetail.deletedAt?.value,
                        
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedChannelsDetailEvent(
                this.aggregateRoots.map(channelDetail => 
                    new DeletedChannelDetailEvent(
                        channelDetail.id.value,
                        channelDetail.tenantId.value,
                        channelDetail.tenantCode.value,
                        channelDetail.systemId.value,
                        channelDetail.systemName.value,
                        channelDetail.executionId.value,
                        channelDetail.executionType.value,
                        channelDetail.executionExecutedAt.value,
                        channelDetail.executionMonitoringStartAt.value,
                        channelDetail.executionMonitoringEndAt.value,
                        channelDetail.status.value,
                        channelDetail.channelHash.value,
                        channelDetail.channelSapId.value,
                        channelDetail.channelParty?.value,
                        channelDetail.channelComponent.value,
                        channelDetail.channelName.value,
                        channelDetail.detail?.value,
                        channelDetail.createdAt?.value,
                        channelDetail.updatedAt?.value,
                        channelDetail.deletedAt?.value,
                           
                    )
                )
            )
        );
    }   
}