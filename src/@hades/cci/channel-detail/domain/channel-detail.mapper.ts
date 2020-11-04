import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciChannelDetail } from './channel-detail.aggregate';
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
    ChannelDetailChannelHash,
    ChannelDetailChannelSapId,
    ChannelDetailChannelParty,
    ChannelDetailChannelComponent,
    ChannelDetailChannelName,
    ChannelDetailDetail,
    ChannelDetailCreatedAt,
    ChannelDetailUpdatedAt,
    ChannelDetailDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';

export class ChannelDetailMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param channelDetail
     */
    mapModelToAggregate(channelDetail: ObjectLiteral, cQMetadata?: CQMetadata): CciChannelDetail
    {
        if (!channelDetail) return;

        return this.makeAggregate(channelDetail, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param channelsDetail
     */
    mapModelsToAggregates(channelsDetail: ObjectLiteral[], cQMetadata?: CQMetadata): CciChannelDetail[]
    {
        if (!Array.isArray(channelsDetail)) return;

        return channelsDetail.map(channelDetail  => this.makeAggregate(channelDetail, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param channelDetail
     */
    mapAggregateToResponse(channelDetail: CciChannelDetail): ChannelDetailResponse
    {
        return this.makeResponse(channelDetail);
    }

    /**
     * Map array of aggregates to array responses
     * @param channelsDetail
     */
    mapAggregatesToResponses(channelsDetail: CciChannelDetail[]): ChannelDetailResponse[]
    {
        if (!Array.isArray(channelsDetail)) return;

        return channelsDetail.map(channelDetail => this.makeResponse(channelDetail));
    }

    private makeAggregate(channelDetail: ObjectLiteral, cQMetadata?: CQMetadata): CciChannelDetail
    {
        return CciChannelDetail.register(
            new ChannelDetailId(channelDetail.id),
            new ChannelDetailTenantId(channelDetail.tenantId),
            new ChannelDetailTenantCode(channelDetail.tenantCode),
            new ChannelDetailSystemId(channelDetail.systemId),
            new ChannelDetailSystemName(channelDetail.systemName),
            new ChannelDetailExecutionId(channelDetail.executionId),
            new ChannelDetailExecutionType(channelDetail.executionType),
            new ChannelDetailExecutionExecutedAt(channelDetail.executionExecutedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelDetailExecutionMonitoringStartAt(channelDetail.executionMonitoringStartAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelDetailExecutionMonitoringEndAt(channelDetail.executionMonitoringEndAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelDetailStatus(channelDetail.status),
            new ChannelDetailChannelHash(channelDetail.channelHash),
            new ChannelDetailChannelSapId(channelDetail.channelSapId),
            new ChannelDetailChannelParty(channelDetail.channelParty),
            new ChannelDetailChannelComponent(channelDetail.channelComponent),
            new ChannelDetailChannelName(channelDetail.channelName),
            new ChannelDetailDetail(channelDetail.detail),
            new ChannelDetailCreatedAt(channelDetail.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelDetailUpdatedAt(channelDetail.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelDetailDeletedAt(channelDetail.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(channelDetail.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(channelDetail.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(channelDetail.execution) : undefined,
        );
    }

    private makeResponse(channelDetail: CciChannelDetail): ChannelDetailResponse
    {
        if (!channelDetail) return;

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
            channelDetail.channelHash.value,
            channelDetail.channelSapId.value,
            channelDetail.channelParty.value,
            channelDetail.channelComponent.value,
            channelDetail.channelName.value,
            channelDetail.detail.value,
            channelDetail.createdAt.value,
            channelDetail.updatedAt.value,
            channelDetail.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(channelDetail.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(channelDetail.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(channelDetail.execution) : undefined,
        );
    }
}