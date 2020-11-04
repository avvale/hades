import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import {
    ChannelDetailId,
    ChannelDetailTenantId,
    ChannelDetailTenantCode,
    ChannelDetailSystemId,
    ChannelDetailSystemName,
    ChannelDetailExecutionId,
    ChannelDetailExecutionType,
    ChannelDetailExecutionExecutedAt,
    ChannelDetailExecutionMonitoringStartAt,
    ChannelDetailExecutionMonitoringEndAt,
    ChannelDetailStatus,
    ChannelDetailChannelHash,
    ChannelDetailChannelSapId,
    ChannelDetailChannelParty,
    ChannelDetailChannelComponent,
    ChannelDetailChannelName,
    ChannelDetailDetail,
    ChannelDetailCreatedAt,
    ChannelDetailUpdatedAt,
    ChannelDetailDeletedAt,
} from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { CciChannelDetail } from './../../domain/channel-detail.aggregate';
import { AddChannelsDetailContextEvent } from './../events/add-channels-detail-context.event';

@Injectable()
export class CreateChannelsDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository,
    ) {}

    public async main(
        channelsDetail: {
            id: ChannelDetailId,
            tenantId: ChannelDetailTenantId,
            tenantCode: ChannelDetailTenantCode,
            systemId: ChannelDetailSystemId,
            systemName: ChannelDetailSystemName,
            executionId: ChannelDetailExecutionId,
            executionType: ChannelDetailExecutionType,
            executionExecutedAt: ChannelDetailExecutionExecutedAt,
            executionMonitoringStartAt: ChannelDetailExecutionMonitoringStartAt,
            executionMonitoringEndAt: ChannelDetailExecutionMonitoringEndAt,
            status: ChannelDetailStatus,
            channelHash: ChannelDetailChannelHash,
            channelSapId: ChannelDetailChannelSapId,
            channelParty: ChannelDetailChannelParty,
            channelComponent: ChannelDetailChannelComponent,
            channelName: ChannelDetailChannelName,
            detail: ChannelDetailDetail,
        } []
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateChannelsDetail = channelsDetail.map(channelDetail => CciChannelDetail.register(
            channelDetail.id,
            channelDetail.tenantId,
            channelDetail.tenantCode,
            channelDetail.systemId,
            channelDetail.systemName,
            channelDetail.executionId,
            channelDetail.executionType,
            channelDetail.executionExecutedAt,
            channelDetail.executionMonitoringStartAt,
            channelDetail.executionMonitoringEndAt,
            channelDetail.status,
            channelDetail.channelHash,
            channelDetail.channelSapId,
            channelDetail.channelParty,
            channelDetail.channelComponent,
            channelDetail.channelName,
            channelDetail.detail,
            new ChannelDetailCreatedAt({currentTimestamp: true}),
            new ChannelDetailUpdatedAt({currentTimestamp: true}),
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