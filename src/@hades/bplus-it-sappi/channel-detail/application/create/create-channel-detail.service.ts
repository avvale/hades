import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    ChannelDetailChannelId, 
    ChannelDetailChannelSapId, 
    ChannelDetailChannelParty, 
    ChannelDetailChannelComponent, 
    ChannelDetailChannelName, 
    ChannelDetailDetail, 
    ChannelDetailCreatedAt, 
    ChannelDetailUpdatedAt, 
    ChannelDetailDeletedAt
    
} from './../../domain/value-objects';
import { IChannelDetailRepository } from './../../domain/channel-detail.repository';
import { BplusItSappiChannelDetail } from './../../domain/channel-detail.aggregate';

@Injectable()
export class CreateChannelDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(
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
        channelId: ChannelDetailChannelId,
        channelSapId: ChannelDetailChannelSapId,
        channelParty: ChannelDetailChannelParty,
        channelComponent: ChannelDetailChannelComponent,
        channelName: ChannelDetailChannelName,
        detail: ChannelDetailDetail,
        
    ): Promise<void>
    {
        // create object with factory pattern
        const channelDetail = BplusItSappiChannelDetail.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            status,
            channelId,
            channelSapId,
            channelParty,
            channelComponent,
            channelName,
            detail,
            new ChannelDetailCreatedAt(Utils.nowTimestamp()),
            new ChannelDetailUpdatedAt(Utils.nowTimestamp()),
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