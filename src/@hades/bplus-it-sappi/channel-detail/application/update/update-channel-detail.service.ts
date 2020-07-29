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
    ChannelDetailChannelHash, 
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
export class UpdateChannelDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IChannelDetailRepository
    ) {}

    public async main(
        id: ChannelDetailId,
        tenantId?: ChannelDetailTenantId,
        tenantCode?: ChannelDetailTenantCode,
        systemId?: ChannelDetailSystemId,
        systemName?: ChannelDetailSystemName,
        executionId?: ChannelDetailExecutionId,
        executionType?: ChannelDetailExecutionType,
        executionExecutedAt?: ChannelDetailExecutionExecutedAt,
        executionMonitoringStartAt?: ChannelDetailExecutionMonitoringStartAt,
        executionMonitoringEndAt?: ChannelDetailExecutionMonitoringEndAt,
        status?: ChannelDetailStatus,
        channelHash?: ChannelDetailChannelHash,
        channelSapId?: ChannelDetailChannelSapId,
        channelParty?: ChannelDetailChannelParty,
        channelComponent?: ChannelDetailChannelComponent,
        channelName?: ChannelDetailChannelName,
        detail?: ChannelDetailDetail,
        
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
            channelHash,
            channelSapId,
            channelParty,
            channelComponent,
            channelName,
            detail,
            null,
            new ChannelDetailUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(channelDetail);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const channelDetailRegister = this.publisher.mergeObjectContext(
            channelDetail
        );
        
        channelDetailRegister.updated(channelDetail); // apply event to model events
        channelDetailRegister.commit(); // commit all events of model
    }
}