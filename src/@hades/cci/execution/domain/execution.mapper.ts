import { IMapper } from '@hades/shared/domain/lib/mapper';
import { MapperOptions, ObjectLiteral, QueryMetadata } from '@hades/shared/domain/lib/hades.types';
import { CciExecution } from './execution.aggregate';
import { ExecutionResponse } from './execution.response';
import {
    ExecutionId,
    ExecutionTenantId,
    ExecutionTenantCode,
    ExecutionSystemId,
    ExecutionSystemName,
    ExecutionVersion,
    ExecutionType,
    ExecutionExecutedAt,
    ExecutionMonitoringStartAt,
    ExecutionMonitoringEndAt,
    ExecutionCreatedAt,
    ExecutionUpdatedAt,
    ExecutionDeletedAt,
} from './value-objects';
import { TenantMapper } from '@hades/iam/tenant/domain/tenant.mapper';
import { SystemMapper } from '@hades/cci/system/domain/system.mapper';

export class ExecutionMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param execution
     */
    mapModelToAggregate(execution: ObjectLiteral, queryMetadata?: QueryMetadata): CciExecution
    {
        if (!execution) return;

        return this.makeAggregate(execution, queryMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param executions
     */
    mapModelsToAggregates(executions: ObjectLiteral[], queryMetadata?: QueryMetadata): CciExecution[]
    {
        if (!Array.isArray(executions)) return;

        return executions.map(execution  => this.makeAggregate(execution, queryMetadata));
    }

    /**
     * Map aggregate to response
     * @param execution
     */
    mapAggregateToResponse(execution: CciExecution): ExecutionResponse
    {
        return this.makeResponse(execution);
    }

    /**
     * Map array of aggregates to array responses
     * @param executions
     */
    mapAggregatesToResponses(executions: CciExecution[]): ExecutionResponse[]
    {
        if (!Array.isArray(executions)) return;

        return executions.map(execution => this.makeResponse(execution));
    }

    private makeAggregate(execution: ObjectLiteral, queryMetadata?: QueryMetadata): CciExecution
    {
        return CciExecution.register(
            new ExecutionId(execution.id),
            new ExecutionTenantId(execution.tenantId),
            new ExecutionTenantCode(execution.tenantCode),
            new ExecutionSystemId(execution.systemId),
            new ExecutionSystemName(execution.systemName),
            new ExecutionVersion(execution.version),
            new ExecutionType(execution.type),
            new ExecutionExecutedAt(execution.executedAt, {}, {addTimezone: queryMetadata.timezone}),
            new ExecutionMonitoringStartAt(execution.monitoringStartAt, {}, {addTimezone: queryMetadata.timezone}),
            new ExecutionMonitoringEndAt(execution.monitoringEndAt, {}, {addTimezone: queryMetadata.timezone}),
            new ExecutionCreatedAt(execution.createdAt, {}, {addTimezone: queryMetadata.timezone}),
            new ExecutionUpdatedAt(execution.updatedAt, {}, {addTimezone: queryMetadata.timezone}),
            new ExecutionDeletedAt(execution.deletedAt, {}, {addTimezone: queryMetadata.timezone}),
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapModelToAggregate(execution.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapModelToAggregate(execution.system) : undefined,
        );
    }

    private makeResponse(execution: CciExecution): ExecutionResponse
    {
        if (!execution) return;

        return new ExecutionResponse(
            execution.id.value,
            execution.tenantId.value,
            execution.tenantCode.value,
            execution.systemId.value,
            execution.systemName.value,
            execution.version.value,
            execution.type.value,
            execution.executedAt.value,
            execution.monitoringStartAt.value,
            execution.monitoringEndAt.value,
            execution.createdAt.value,
            execution.updatedAt.value,
            execution.deletedAt.value,
            this.options.eagerLoading ? new TenantMapper({ eagerLoading: false }).mapAggregateToResponse(execution.tenant) : undefined,
            this.options.eagerLoading ? new SystemMapper({ eagerLoading: false }).mapAggregateToResponse(execution.system) : undefined,
        );
    }
}