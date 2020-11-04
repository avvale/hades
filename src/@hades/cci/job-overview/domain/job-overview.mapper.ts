import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, CQMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciJobOverview } from './job-overview.aggregate';
import { JobOverviewResponse } from './job-overview.response';
import {
    JobOverviewId,
    JobOverviewTenantId,
    JobOverviewTenantCode,
    JobOverviewSystemId,
    JobOverviewSystemName,
    JobOverviewExecutionId,
    JobOverviewExecutionType,
    JobOverviewExecutionExecutedAt,
    JobOverviewExecutionMonitoringStartAt,
    JobOverviewExecutionMonitoringEndAt,
    JobOverviewCancelled,
    JobOverviewCompleted,
    JobOverviewError,
    JobOverviewCreatedAt,
    JobOverviewUpdatedAt,
    JobOverviewDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';
import { ExecutionMapper } from '@hades/cci/execution/domain/execution.mapper';

export class JobOverviewMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param jobOverview
     */
    mapModelToAggregate(jobOverview: ObjectLiteral, cQMetadata?: CQMetadata): CciJobOverview
    {
        if (!jobOverview) return;

        return this.makeAggregate(jobOverview, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param jobsOverview
     */
    mapModelsToAggregates(jobsOverview: ObjectLiteral[], cQMetadata?: CQMetadata): CciJobOverview[]
    {
        if (!Array.isArray(jobsOverview)) return;

        return jobsOverview.map(jobOverview  => this.makeAggregate(jobOverview, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param jobOverview
     */
    mapAggregateToResponse(jobOverview: CciJobOverview): JobOverviewResponse
    {
        return this.makeResponse(jobOverview);
    }

    /**
     * Map array of aggregates to array responses
     * @param jobsOverview
     */
    mapAggregatesToResponses(jobsOverview: CciJobOverview[]): JobOverviewResponse[]
    {
        if (!Array.isArray(jobsOverview)) return;

        return jobsOverview.map(jobOverview => this.makeResponse(jobOverview));
    }

    private makeAggregate(jobOverview: ObjectLiteral, cQMetadata?: CQMetadata): CciJobOverview
    {
        return CciJobOverview.register(
            new JobOverviewId(jobOverview.id),
            new JobOverviewTenantId(jobOverview.tenantId),
            new JobOverviewTenantCode(jobOverview.tenantCode),
            new JobOverviewSystemId(jobOverview.systemId),
            new JobOverviewSystemName(jobOverview.systemName),
            new JobOverviewExecutionId(jobOverview.executionId),
            new JobOverviewExecutionType(jobOverview.executionType),
            new JobOverviewExecutionExecutedAt(jobOverview.executionExecutedAt, {}, {addTimezone: cQMetadata.timezone}),
            new JobOverviewExecutionMonitoringStartAt(jobOverview.executionMonitoringStartAt, {}, {addTimezone: cQMetadata.timezone}),
            new JobOverviewExecutionMonitoringEndAt(jobOverview.executionMonitoringEndAt, {}, {addTimezone: cQMetadata.timezone}),
            new JobOverviewCancelled(jobOverview.cancelled),
            new JobOverviewCompleted(jobOverview.completed),
            new JobOverviewError(jobOverview.error),
            new JobOverviewCreatedAt(jobOverview.createdAt, {}, {addTimezone: cQMetadata.timezone}),
            new JobOverviewUpdatedAt(jobOverview.updatedAt, {}, {addTimezone: cQMetadata.timezone}),
            new JobOverviewDeletedAt(jobOverview.deletedAt, {}, {addTimezone: cQMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(jobOverview.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(jobOverview.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapModelToAggregate(jobOverview.execution) : undefined,
        );
    }

    private makeResponse(jobOverview: CciJobOverview): JobOverviewResponse
    {
        if (!jobOverview) return;

        return new JobOverviewResponse(
            jobOverview.id.value,
            jobOverview.tenantId.value,
            jobOverview.tenantCode.value,
            jobOverview.systemId.value,
            jobOverview.systemName.value,
            jobOverview.executionId.value,
            jobOverview.executionType.value,
            jobOverview.executionExecutedAt.value,
            jobOverview.executionMonitoringStartAt.value,
            jobOverview.executionMonitoringEndAt.value,
            jobOverview.cancelled.value,
            jobOverview.completed.value,
            jobOverview.error.value,
            jobOverview.createdAt.value,
            jobOverview.updatedAt.value,
            jobOverview.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(jobOverview.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(jobOverview.system) : undefined,
            this.options.eagerLoading ? new ExecutionMapper({ eagerLoading: false }).mapAggregateToResponse(jobOverview.execution) : undefined,
        );
    }
}