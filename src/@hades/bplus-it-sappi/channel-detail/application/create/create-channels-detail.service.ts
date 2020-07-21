import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
import { 
    ChannelDetailId, 
    ChannelDetailTenantId, 
    ChannelDetailSystemId, 
    ChannelDetailSystemName, 
    ChannelDetailExecutionId, 
    ChannelDetailExecutionType, 
    ChannelDetailExecutionExecutedAt, 
    ChannelDetailExecutionMonitoringStartAt, 
    ChannelDetailExecutionMonitoringEndAt, 
    ChannelDetailStatus, 
    ChannelDetailChannelId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail, 
    ChannelDetailExample, 
    ChannelDetailCreatedAt, 
    ChannelDetailUpdatedAt, 
    ChannelDetailDeletedAt
    
} from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';
import { AddChannelsDetailContextEvent } from './../events/add-channels-detail-context.event';

@Injectable()
export class CreateChannelsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(
        channelsDetail: {
            id: ChannelDetailId,
            tenantId: ChannelDetailTenantId,
            systemId: ChannelDetailSystemId,
            systemName: ChannelDetailSystemName,
            executionId: ChannelDetailExecutionId,
            executionType: ChannelDetailExecutionType,
            executionExecutedAt: ChannelDetailExecutionExecutedAt,
            executionMonitoringStartAt: ChannelDetailExecutionMonitoringStartAt,
            executionMonitoringEndAt: ChannelDetailExecutionMonitoringEndAt,
            status: ChannelDetailStatus,
            channelId: ChannelDetailChannelId,
            channelParty: ChannelDetailChannelParty,
            channelComponent: ChannelDetailChannelComponent,
            channelName: ChannelDetailChannelName,
            detail: ChannelDetailDetail,
            example: ChannelDetailExample,
            
        } []
    ): Promise<void>
    {
        // create object with factory pattern
        const aggregateChannelsDetail = channelsDetail.map(channelDetail => BplusItSappiChannelDetail.register(
            channelDetail.id,
            channelDetail.tenantId,
            channelDetail.systemId,
            channelDetail.systemName,
            channelDetail.executionId,
            channelDetail.executionType,
            channelDetail.executionExecutedAt,
            channelDetail.executionMonitoringStartAt,
            channelDetail.executionMonitoringEndAt,
            channelDetail.status,
            channelDetail.channelId,
            channelDetail.channelParty,
            channelDetail.channelComponent,
            channelDetail.channelName,
            channelDetail.detail,
            channelDetail.example,
            new ChannelDetailCreatedAt(Utils.nowTimestamp()),
            new ChannelDetailUpdatedAt(Utils.nowTimestamp()),
            null
        ));
        
        // insert
        await this.repository.insert(aggregateChannelsDetail);

        // create AddChannelsDetailContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const channelsDetailRegistered = this.publisher.mergeObjectContext(new AddChannelsDetailContextEvent(aggregateChannelsDetail));
 
        channelsDetailRegistered.created(); // apply event to model events
        channelsDetailRegistered.commit(); // commit all events of model
    }
}