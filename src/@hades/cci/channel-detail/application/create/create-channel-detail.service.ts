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

@Injectable()
export class CreateChannelDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository,
    ) {}

    public async main(
        payload: {
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
        },
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const channelDetail = CciChannelDetail.register(
            payload.id,
            payload.tenantId,
            payload.tenantCode,
            payload.systemId,
            payload.systemName,
            payload.executionId,
            payload.executionType,
            payload.executionExecutedAt,
            payload.executionMonitoringStartAt,
            payload.executionMonitoringEndAt,
            payload.status,
            payload.channelHash,
            payload.channelSapId,
            payload.channelParty,
            payload.channelComponent,
            payload.channelName,
            payload.detail,
            new ChannelDetailCreatedAt({currentTimestamp: true}),
            new ChannelDetailUpdatedAt({currentTimestamp: true}),
            null
        );

        // create
        await this.repository.create(channelDetail);

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const channelDetailRegister = this.publisher.mergeObjectContext(
            channelDetail
        );

        channelDetailRegister.created(channelDetail); // apply event to model events
        channelDetailRegister.commit(); // commit all events of model
    }
}