import { AggregateRoot } from '@nestjs/cqrs';
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
import { CreatedJobOverviewEvent } from './../application/events/created-job-overview.event';
import { UpdatedJobOverviewEvent } from './../application/events/updated-job-overview.event';
import { DeletedJobOverviewEvent } from './../application/events/deleted-job-overview.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';
import { CciExecution } from '@hades/cci/execution/domain/execution.aggregate';

export class CciJobOverview extends AggregateRoot
{
    id: JobOverviewId;
    tenantId: JobOverviewTenantId;
    tenantCode: JobOverviewTenantCode;
    systemId: JobOverviewSystemId;
    systemName: JobOverviewSystemName;
    executionId: JobOverviewExecutionId;
    executionType: JobOverviewExecutionType;
    executionExecutedAt: JobOverviewExecutionExecutedAt;
    executionMonitoringStartAt: JobOverviewExecutionMonitoringStartAt;
    executionMonitoringEndAt: JobOverviewExecutionMonitoringEndAt;
    cancelled: JobOverviewCancelled;
    completed: JobOverviewCompleted;
    error: JobOverviewError;
    createdAt: JobOverviewCreatedAt;
    updatedAt: JobOverviewUpdatedAt;
    deletedAt: JobOverviewDeletedAt;

    // eager relationship
    tenant: IamTenant;
    system: CciSystem;
    execution: CciExecution;

    constructor(id?: JobOverviewId, tenantId?: JobOverviewTenantId, tenantCode?: JobOverviewTenantCode, systemId?: JobOverviewSystemId, systemName?: JobOverviewSystemName, executionId?: JobOverviewExecutionId, executionType?: JobOverviewExecutionType, executionExecutedAt?: JobOverviewExecutionExecutedAt, executionMonitoringStartAt?: JobOverviewExecutionMonitoringStartAt, executionMonitoringEndAt?: JobOverviewExecutionMonitoringEndAt, cancelled?: JobOverviewCancelled, completed?: JobOverviewCompleted, error?: JobOverviewError, createdAt?: JobOverviewCreatedAt, updatedAt?: JobOverviewUpdatedAt, deletedAt?: JobOverviewDeletedAt, tenant?: IamTenant, system?: CciSystem, execution?: CciExecution, )
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
        this.cancelled = cancelled;
        this.completed = completed;
        this.error = error;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.tenant = tenant;
        this.system = system;
        this.execution = execution;
    }

    static register (id: JobOverviewId, tenantId: JobOverviewTenantId, tenantCode: JobOverviewTenantCode, systemId: JobOverviewSystemId, systemName: JobOverviewSystemName, executionId: JobOverviewExecutionId, executionType: JobOverviewExecutionType, executionExecutedAt: JobOverviewExecutionExecutedAt, executionMonitoringStartAt: JobOverviewExecutionMonitoringStartAt, executionMonitoringEndAt: JobOverviewExecutionMonitoringEndAt, cancelled: JobOverviewCancelled, completed: JobOverviewCompleted, error: JobOverviewError, createdAt: JobOverviewCreatedAt, updatedAt: JobOverviewUpdatedAt, deletedAt: JobOverviewDeletedAt, tenant?: IamTenant, system?: CciSystem, execution?: CciExecution, ): CciJobOverview
    {
        return new CciJobOverview(id, tenantId, tenantCode, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, cancelled, completed, error, createdAt, updatedAt, deletedAt, tenant, system, execution, );
    }

    created(jobOverview: CciJobOverview): void
    {
        this.apply(
            new CreatedJobOverviewEvent(
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
                jobOverview.cancelled?.value,
                jobOverview.completed?.value,
                jobOverview.error?.value,
                jobOverview.createdAt?.value,
                jobOverview.updatedAt?.value,
                jobOverview.deletedAt?.value,
            )
        );
    }

    updated(jobOverview: CciJobOverview): void
    {
        this.apply(
            new UpdatedJobOverviewEvent(
                jobOverview.id.value,
                jobOverview.tenantId?.value,
                jobOverview.tenantCode?.value,
                jobOverview.systemId?.value,
                jobOverview.systemName?.value,
                jobOverview.executionId?.value,
                jobOverview.executionType?.value,
                jobOverview.executionExecutedAt?.value,
                jobOverview.executionMonitoringStartAt?.value,
                jobOverview.executionMonitoringEndAt?.value,
                jobOverview.cancelled?.value,
                jobOverview.completed?.value,
                jobOverview.error?.value,
                jobOverview.createdAt?.value,
                jobOverview.updatedAt?.value,
                jobOverview.deletedAt?.value,
            )
        );
    }

    deleted(jobOverview: CciJobOverview): void
    {
        this.apply(
            new DeletedJobOverviewEvent(
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
                jobOverview.cancelled?.value,
                jobOverview.completed?.value,
                jobOverview.error?.value,
                jobOverview.createdAt?.value,
                jobOverview.updatedAt?.value,
                jobOverview.deletedAt?.value,
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
            cancelled: this.cancelled?.value,
            completed: this.completed?.value,
            error: this.error?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            tenant: this.tenant?.toDTO(),
            system: this.system?.toDTO(),
            execution: this.execution?.toDTO(),
        }
    }
}
