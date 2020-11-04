import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciChannelOverview } from './channel-overview.aggregate';
import { ChannelOverviewResponse } from './channel-overview.response';
import {
    ChannelOverviewId,
    ChannelOverviewTenantId,
    ChannelOverviewTenantCode,
    ChannelOverviewSystemId,
    ChannelOverviewSystemName,
    ChannelOverviewExecutionId,
    ChannelOverviewExecutionType,
    ChannelOverviewExecutionExecutedAt,
    ChannelOverviewExecutionMonitoringStartAt,
    ChannelOverviewExecutionMonitoringEndAt,
    ChannelOverviewError,
    ChannelOverviewInactive,
    ChannelOverviewSuccessful,
    ChannelOverviewStopped,
    ChannelOverviewUnknown,
    ChannelOverviewUnregistered,
    ChannelOverviewCreatedAt,
    ChannelOverviewUpdatedAt,
    ChannelOverviewDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';

export class ChannelOverviewMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param channelOverview
     */
    mapModelToAggregate(channelOverview: ObjectLiteral, cQMetadata?: CQMetadata): CciChannelOverview
    {
        if (!channelOverview) return;

        return this.makeAggregate(channelOverview, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param channelsOverview
     */
    mapModelsToAggregates(channelsOverview: ObjectLiteral[], cQMetadata?: CQMetadata): CciChannelOverview[]
    {
        if (!Array.isArray(channelsOverview)) return;

        return channelsOverview.map(channelOverview  => this.makeAggregate(channelOverview, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param channelOverview
     */
    mapAggregateToResponse(channelOverview: CciChannelOverview): ChannelOverviewResponse
    {
        return this.makeResponse(channelOverview);
    }

    /**
     * Map array of aggregates to array responses
     * @param channelsOverview
     */
    mapAggregatesToResponses(channelsOverview: CciChannelOverview[]): ChannelOverviewResponse[]
    {
        if (!Array.isArray(channelsOverview)) return;

        return channelsOverview.map(channelOverview => this.makeResponse(channelOverview));
    }

    private makeAggregate(channelOverview: ObjectLiteral, cQMetadata?: CQMetadata): CciChannelOverview
    {
        return CciChannelOverview.register(
            new ChannelOverviewId(channelOverview.id),
            new ChannelOverviewTenantId(channelOverview.tenantId),
            new ChannelOverviewTenantCode(channelOverview.tenantCode),
            new ChannelOverviewSystemId(channelOverview.systemId),
            new ChannelOverviewSystemName(channelOverview.systemName),
            new ChannelOverviewExecutionId(channelOverview.executionId),
            new ChannelOverviewExecutionType(channelOverview.executionType),
            new ChannelOverviewExecutionExecutedAt(channelOverview.executionExecutedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelOverviewExecutionMonitoringStartAt(channelOverview.executionMonitoringStartAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelOverviewExecutionMonitoringEndAt(channelOverview.executionMonitoringEndAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelOverviewError(channelOverview.error),
            new ChannelOverviewInactive(channelOverview.inactive),
            new ChannelOverviewSuccessful(channelOverview.successful),
            new ChannelOverviewStopped(channelOverview.stopped),
            new ChannelOverviewUnknown(channelOverview.unknown),
            new ChannelOverviewUnregistered(channelOverview.unregistered),
            new ChannelOverviewCreatedAt(channelOverview.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelOverviewUpdatedAt(channelOverview.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new ChannelOverviewDeletedAt(channelOverview.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(channelOverview.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(channelOverview.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(channelOverview.execution) : undefined,
        );
    }

    private makeResponse(channelOverview: CciChannelOverview): ChannelOverviewResponse
    {
        if (!channelOverview) return;

        return new ChannelOverviewResponse(
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
            channelOverview.error.value,
            channelOverview.inactive.value,
            channelOverview.successful.value,
            channelOverview.stopped.value,
            channelOverview.unknown.value,
            channelOverview.unregistered.value,
            channelOverview.createdAt.value,
            channelOverview.updatedAt.value,
            channelOverview.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(channelOverview.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(channelOverview.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(channelOverview.execution) : undefined,
        );
    }
}