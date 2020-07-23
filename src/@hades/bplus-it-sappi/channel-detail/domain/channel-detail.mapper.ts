import { IMapper } from '@hades/shared/domain/lib/mapper';
import { ObjectLiteral } from '@hades/shared/domain/lib/object-literal';
import { BplusItSappiChannelDetail } from './channel-detail.aggregate';
import { ChannelDetailResponse } from './channel-detail.response';
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
    
} from './value-objects';

export class ChannelDetailMapper implements IMapper
{
    /**
     * Map object to aggregate
     * @param channelDetail
     */
    mapObjectToAggregate(channelDetail: ObjectLiteral): BplusItSappiChannelDetail
    {
        return this.makeAggregate(channelDetail);
    }

    /**
     * Map array of objects to array aggregates
     * @param channelsDetail 
     */
    mapObjectsToAggregates(channelsDetail: ObjectLiteral[]): BplusItSappiChannelDetail[]
    {
        return channelsDetail.map(channelDetail  => this.makeAggregate(channelDetail ));
    }

    /**
     * Map aggregate to response
     * @param channelDetail 
     */
    mapAggregateToResponse(channelDetail: BplusItSappiChannelDetail): ChannelDetailResponse
    {
        return this.makeResponse(channelDetail);
    }

    /**
     * Map array of aggregates to array responses
     * @param channelsDetail
     */
    mapAggregatesToResponses(channelsDetail: BplusItSappiChannelDetail[]): ChannelDetailResponse[]
    {
        return channelsDetail.map(channelDetail => this.makeResponse(channelDetail));
    }

    private makeAggregate(channelDetail: ObjectLiteral): BplusItSappiChannelDetail
    {
        return BplusItSappiChannelDetail.register(
            new ChannelDetailId(channelDetail.id),
            new ChannelDetailTenantId(channelDetail.tenantId),
            new ChannelDetailTenantCode(channelDetail.tenantCode),
            new ChannelDetailSystemId(channelDetail.systemId),
            new ChannelDetailSystemName(channelDetail.systemName),
            new ChannelDetailExecutionId(channelDetail.executionId),
            new ChannelDetailExecutionType(channelDetail.executionType),
            new ChannelDetailExecutionExecutedAt(channelDetail.executionExecutedAt),
            new ChannelDetailExecutionMonitoringStartAt(channelDetail.executionMonitoringStartAt),
            new ChannelDetailExecutionMonitoringEndAt(channelDetail.executionMonitoringEndAt),
            new ChannelDetailStatus(channelDetail.status),
            new ChannelDetailChannelId(channelDetail.channelId),
            new ChannelDetailChannelSapId(channelDetail.channelSapId),
            new ChannelDetailChannelParty(channelDetail.channelParty),
            new ChannelDetailChannelComponent(channelDetail.channelComponent),
            new ChannelDetailChannelName(channelDetail.channelName),
            new ChannelDetailDetail(channelDetail.detail),
            new ChannelDetailCreatedAt(channelDetail.createdAt),
            new ChannelDetailUpdatedAt(channelDetail.updatedAt),
            new ChannelDetailDeletedAt(channelDetail.deletedAt),
              
        );
    }

    private makeResponse(channelDetail: BplusItSappiChannelDetail): ChannelDetailResponse
    {
        return new ChannelDetailResponse(
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
            channelDetail.channelId.value,
            channelDetail.channelSapId.value,
            channelDetail.channelParty.value,
            channelDetail.channelComponent.value,
            channelDetail.channelName.value,
            channelDetail.detail.value,
            channelDetail.createdAt.value,
            channelDetail.updatedAt.value,
            channelDetail.deletedAt.value,
            
        );
    }
}