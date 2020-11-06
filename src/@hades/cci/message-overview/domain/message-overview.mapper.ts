import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciMessageOverview } from './message-overview.aggregate';
import { MessageOverviewResponse } from './message-overview.response';
import {
    MessageOverviewId,
    MessageOverviewTenantId,
    MessageOverviewTenantCode,
    MessageOverviewSystemId,
    MessageOverviewSystemName,
    MessageOverviewExecutionId,
    MessageOverviewExecutionType,
    MessageOverviewExecutionExecutedAt,
    MessageOverviewExecutionMonitoringStartAt,
    MessageOverviewExecutionMonitoringEndAt,
    MessageOverviewNumberMax,
    MessageOverviewNumberDays,
    MessageOverviewSuccess,
    MessageOverviewCancelled,
    MessageOverviewDelivering,
    MessageOverviewError,
    MessageOverviewHolding,
    MessageOverviewToBeDelivered,
    MessageOverviewWaiting,
    MessageOverviewCreatedAt,
    MessageOverviewUpdatedAt,
    MessageOverviewDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';

export class MessageOverviewMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param messageOverview
     */
    mapModelToAggregate(messageOverview: ObjectLiteral, cQMetadata?: CQMetadata): CciMessageOverview
    {
        if (!messageOverview) return;

        return this.makeAggregate(messageOverview, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param messagesOverview
     */
    mapModelsToAggregates(messagesOverview: ObjectLiteral[], cQMetadata?: CQMetadata): CciMessageOverview[]
    {
        if (!Array.isArray(messagesOverview)) return;

        return messagesOverview.map(messageOverview  => this.makeAggregate(messageOverview, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param messageOverview
     */
    mapAggregateToResponse(messageOverview: CciMessageOverview): MessageOverviewResponse
    {
        return this.makeResponse(messageOverview);
    }

    /**
     * Map array of aggregates to array responses
     * @param messagesOverview
     */
    mapAggregatesToResponses(messagesOverview: CciMessageOverview[]): MessageOverviewResponse[]
    {
        if (!Array.isArray(messagesOverview)) return;

        return messagesOverview.map(messageOverview => this.makeResponse(messageOverview));
    }

    private makeAggregate(messageOverview: ObjectLiteral, cQMetadata?: CQMetadata): CciMessageOverview
    {
        return CciMessageOverview.register(
            new MessageOverviewId(messageOverview.id),
            new MessageOverviewTenantId(messageOverview.tenantId),
            new MessageOverviewTenantCode(messageOverview.tenantCode),
            new MessageOverviewSystemId(messageOverview.systemId),
            new MessageOverviewSystemName(messageOverview.systemName),
            new MessageOverviewExecutionId(messageOverview.executionId),
            new MessageOverviewExecutionType(messageOverview.executionType),
            new MessageOverviewExecutionExecutedAt(messageOverview.executionExecutedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new MessageOverviewExecutionMonitoringStartAt(messageOverview.executionMonitoringStartAt, {}, {addTimezone: cQMetadata?.timezone}),
            new MessageOverviewExecutionMonitoringEndAt(messageOverview.executionMonitoringEndAt, {}, {addTimezone: cQMetadata?.timezone}),
            new MessageOverviewNumberMax(messageOverview.numberMax),
            new MessageOverviewNumberDays(messageOverview.numberDays),
            new MessageOverviewSuccess(messageOverview.success),
            new MessageOverviewCancelled(messageOverview.cancelled),
            new MessageOverviewDelivering(messageOverview.delivering),
            new MessageOverviewError(messageOverview.error),
            new MessageOverviewHolding(messageOverview.holding),
            new MessageOverviewToBeDelivered(messageOverview.toBeDelivered),
            new MessageOverviewWaiting(messageOverview.waiting),
            new MessageOverviewCreatedAt(messageOverview.createdAt, {}, {addTimezone: cQMetadata?.timezone}),
            new MessageOverviewUpdatedAt(messageOverview.updatedAt, {}, {addTimezone: cQMetadata?.timezone}),
            new MessageOverviewDeletedAt(messageOverview.deletedAt, {}, {addTimezone: cQMetadata?.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(messageOverview.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(messageOverview.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(messageOverview.execution) : undefined,
        );
    }

    private makeResponse(messageOverview: CciMessageOverview): MessageOverviewResponse
    {
        if (!messageOverview) return;

        return new MessageOverviewResponse(
            messageOverview.id.value,
            messageOverview.tenantId.value,
            messageOverview.tenantCode.value,
            messageOverview.systemId.value,
            messageOverview.systemName.value,
            messageOverview.executionId.value,
            messageOverview.executionType.value,
            messageOverview.executionExecutedAt.value,
            messageOverview.executionMonitoringStartAt.value,
            messageOverview.executionMonitoringEndAt.value,
            messageOverview.numberMax.value,
            messageOverview.numberDays.value,
            messageOverview.success.value,
            messageOverview.cancelled.value,
            messageOverview.delivering.value,
            messageOverview.error.value,
            messageOverview.holding.value,
            messageOverview.toBeDelivered.value,
            messageOverview.waiting.value,
            messageOverview.createdAt.value,
            messageOverview.updatedAt.value,
            messageOverview.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(messageOverview.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(messageOverview.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(messageOverview.execution) : undefined,
        );
    }
}