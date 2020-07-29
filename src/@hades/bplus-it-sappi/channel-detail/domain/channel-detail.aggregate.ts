import { AggregateRoot } from '@nestjs/cqrs';
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
    
} from './value-objects';
import { CreatedChannelDetailEvent } from './../application/events/created-channel-detail.event';
import { UpdatedChannelDetailEvent } from './../application/events/updated-channel-detail.event';
import { DeletedChannelDetailEvent } from './../application/events/deleted-channel-detail.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';
import { BplusItSappiExecution } from '@hades/bplus-it-sappi/execution/domain/execution.aggregate';
import { BplusItSappiChannel } from '@hades/bplus-it-sappi/channel/domain/channel.aggregate';

export class BplusItSappiChannelDetail extends AggregateRoot
{
    id: ChannelDetailId;
    tenantId: ChannelDetailTenantId;
    tenantCode: ChannelDetailTenantCode;
    systemId: ChannelDetailSystemId;
    systemName: ChannelDetailSystemName;
    executionId: ChannelDetailExecutionId;
    executionType: ChannelDetailExecutionType;
    executionExecutedAt: ChannelDetailExecutionExecutedAt;
    executionMonitoringStartAt: ChannelDetailExecutionMonitoringStartAt;
    executionMonitoringEndAt: ChannelDetailExecutionMonitoringEndAt;
    status: ChannelDetailStatus;
    channelHash: ChannelDetailChannelHash;
    channelSapId: ChannelDetailChannelSapId;
    channelParty: ChannelDetailChannelParty;
    channelComponent: ChannelDetailChannelComponent;
    channelName: ChannelDetailChannelName;
    detail: ChannelDetailDetail;
    createdAt: ChannelDetailCreatedAt;
    updatedAt: ChannelDetailUpdatedAt;
    deletedAt: ChannelDetailDeletedAt;
    
    constructor(id?: ChannelDetailId, tenantId?: ChannelDetailTenantId, tenantCode?: ChannelDetailTenantCode, systemId?: ChannelDetailSystemId, systemName?: ChannelDetailSystemName, executionId?: ChannelDetailExecutionId, executionType?: ChannelDetailExecutionType, executionExecutedAt?: ChannelDetailExecutionExecutedAt, executionMonitoringStartAt?: ChannelDetailExecutionMonitoringStartAt, executionMonitoringEndAt?: ChannelDetailExecutionMonitoringEndAt, status?: ChannelDetailStatus, channelHash?: ChannelDetailChannelHash, channelSapId?: ChannelDetailChannelSapId, channelParty?: ChannelDetailChannelParty, channelComponent?: ChannelDetailChannelComponent, channelName?: ChannelDetailChannelName, detail?: ChannelDetailDetail, createdAt?: ChannelDetailCreatedAt, updatedAt?: ChannelDetailUpdatedAt, deletedAt?: ChannelDetailDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.tenantCode = tenantCode;
        this.systemId = systemId;
        this.systemName = systemName;
        this.executionId = executionId;
        this.executionType = executionType;
        this.executionExecutedAt = executionExecutedAt;
        this.executionMonitoringStartAt = executionMonitoringStartAt;
        this.executionMonitoringEndAt = executionMonitoringEndAt;
        this.status = status;
        this.channelHash = channelHash;
        this.channelSapId = channelSapId;
        this.channelParty = channelParty;
        this.channelComponent = channelComponent;
        this.channelName = channelName;
        this.detail = detail;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: ChannelDetailId, tenantId: ChannelDetailTenantId, tenantCode: ChannelDetailTenantCode, systemId: ChannelDetailSystemId, systemName: ChannelDetailSystemName, executionId: ChannelDetailExecutionId, executionType: ChannelDetailExecutionType, executionExecutedAt: ChannelDetailExecutionExecutedAt, executionMonitoringStartAt: ChannelDetailExecutionMonitoringStartAt, executionMonitoringEndAt: ChannelDetailExecutionMonitoringEndAt, status: ChannelDetailStatus, channelHash: ChannelDetailChannelHash, channelSapId: ChannelDetailChannelSapId, channelParty: ChannelDetailChannelParty, channelComponent: ChannelDetailChannelComponent, channelName: ChannelDetailChannelName, detail: ChannelDetailDetail, createdAt: ChannelDetailCreatedAt, updatedAt: ChannelDetailUpdatedAt, deletedAt: ChannelDetailDeletedAt, ): BplusItSappiChannelDetail
    {
        return new BplusItSappiChannelDetail(id, tenantId, tenantCode, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, status, channelHash, channelSapId, channelParty, channelComponent, channelName, detail, createdAt, updatedAt, deletedAt, );
    }

    created(channelDetail: BplusItSappiChannelDetail): void
    {
        this.apply(
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
        );
    }

    updated(channelDetail: BplusItSappiChannelDetail): void
    {
        this.apply(
            new UpdatedChannelDetailEvent(
                channelDetail.id.value,
                channelDetail.tenantId?.value,
                channelDetail.tenantCode?.value,
                channelDetail.systemId?.value,
                channelDetail.systemName?.value,
                channelDetail.executionId?.value,
                channelDetail.executionType?.value,
                channelDetail.executionExecutedAt?.value,
                channelDetail.executionMonitoringStartAt?.value,
                channelDetail.executionMonitoringEndAt?.value,
                channelDetail.status?.value,
                channelDetail.channelHash?.value,
                channelDetail.channelSapId?.value,
                channelDetail.channelParty?.value,
                channelDetail.channelComponent?.value,
                channelDetail.channelName?.value,
                channelDetail.detail?.value,
                channelDetail.createdAt?.value,
                channelDetail.updatedAt?.value,
                channelDetail.deletedAt?.value,
                
            )
        );
    }

    deleted(channelDetail: BplusItSappiChannelDetail): void
    {
        this.apply(
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
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            tenantCode: this.tenantCode.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            executionId: this.executionId.value,
            executionType: this.executionType.value,
            executionExecutedAt: this.executionExecutedAt.value,
            executionMonitoringStartAt: this.executionMonitoringStartAt.value,
            executionMonitoringEndAt: this.executionMonitoringEndAt.value,
            status: this.status.value,
            channelHash: this.channelHash.value,
            channelSapId: this.channelSapId.value,
            channelParty: this.channelParty?.value,
            channelComponent: this.channelComponent.value,
            channelName: this.channelName.value,
            detail: this.detail?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
