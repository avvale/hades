import { AggregateRoot } from '@nestjs/cqrs';
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
import { CreatedChannelOverviewEvent } from './../application/events/created-channel-overview.event';
import { UpdatedChannelOverviewEvent } from './../application/events/updated-channel-overview.event';
import { DeletedChannelOverviewEvent } from './../application/events/deleted-channel-overview.event';
import { IamTenant } from '@hades/iam/tenant/domain/tenant.aggregate';
import { CciSystem } from '@hades/cci/system/domain/system.aggregate';
import { CciExecution } from '@hades/cci/execution/domain/execution.aggregate';

export class CciChannelOverview extends AggregateRoot
{
    id: ChannelOverviewId;
    tenantId: ChannelOverviewTenantId;
    tenantCode: ChannelOverviewTenantCode;
    systemId: ChannelOverviewSystemId;
    systemName: ChannelOverviewSystemName;
    executionId: ChannelOverviewExecutionId;
    executionType: ChannelOverviewExecutionType;
    executionExecutedAt: ChannelOverviewExecutionExecutedAt;
    executionMonitoringStartAt: ChannelOverviewExecutionMonitoringStartAt;
    executionMonitoringEndAt: ChannelOverviewExecutionMonitoringEndAt;
    error: ChannelOverviewError;
    inactive: ChannelOverviewInactive;
    successful: ChannelOverviewSuccessful;
    stopped: ChannelOverviewStopped;
    unknown: ChannelOverviewUnknown;
    unregistered: ChannelOverviewUnregistered;
    createdAt: ChannelOverviewCreatedAt;
    updatedAt: ChannelOverviewUpdatedAt;
    deletedAt: ChannelOverviewDeletedAt;

    // eager relationship
    tenant: IamTenant;
    system: CciSystem;
    execution: CciExecution;

    constructor(id?: ChannelOverviewId, tenantId?: ChannelOverviewTenantId, tenantCode?: ChannelOverviewTenantCode, systemId?: ChannelOverviewSystemId, systemName?: ChannelOverviewSystemName, executionId?: ChannelOverviewExecutionId, executionType?: ChannelOverviewExecutionType, executionExecutedAt?: ChannelOverviewExecutionExecutedAt, executionMonitoringStartAt?: ChannelOverviewExecutionMonitoringStartAt, executionMonitoringEndAt?: ChannelOverviewExecutionMonitoringEndAt, error?: ChannelOverviewError, inactive?: ChannelOverviewInactive, successful?: ChannelOverviewSuccessful, stopped?: ChannelOverviewStopped, unknown?: ChannelOverviewUnknown, unregistered?: ChannelOverviewUnregistered, createdAt?: ChannelOverviewCreatedAt, updatedAt?: ChannelOverviewUpdatedAt, deletedAt?: ChannelOverviewDeletedAt, tenant?: IamTenant, system?: CciSystem, execution?: CciExecution, )
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
        this.error = error;
        this.inactive = inactive;
        this.successful = successful;
        this.stopped = stopped;
        this.unknown = unknown;
        this.unregistered = unregistered;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.tenant = tenant;
        this.system = system;
        this.execution = execution;
    }

    static register (id: ChannelOverviewId, tenantId: ChannelOverviewTenantId, tenantCode: ChannelOverviewTenantCode, systemId: ChannelOverviewSystemId, systemName: ChannelOverviewSystemName, executionId: ChannelOverviewExecutionId, executionType: ChannelOverviewExecutionType, executionExecutedAt: ChannelOverviewExecutionExecutedAt, executionMonitoringStartAt: ChannelOverviewExecutionMonitoringStartAt, executionMonitoringEndAt: ChannelOverviewExecutionMonitoringEndAt, error: ChannelOverviewError, inactive: ChannelOverviewInactive, successful: ChannelOverviewSuccessful, stopped: ChannelOverviewStopped, unknown: ChannelOverviewUnknown, unregistered: ChannelOverviewUnregistered, createdAt: ChannelOverviewCreatedAt, updatedAt: ChannelOverviewUpdatedAt, deletedAt: ChannelOverviewDeletedAt, tenant?: IamTenant, system?: CciSystem, execution?: CciExecution, ): CciChannelOverview
    {
        return new CciChannelOverview(id, tenantId, tenantCode, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, error, inactive, successful, stopped, unknown, unregistered, createdAt, updatedAt, deletedAt, tenant, system, execution, );
    }

    created(channelOverview: CciChannelOverview): void
    {
        this.apply(
            new CreatedChannelOverviewEvent(
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
                channelOverview.error?.value,
                channelOverview.inactive?.value,
                channelOverview.successful?.value,
                channelOverview.stopped?.value,
                channelOverview.unknown?.value,
                channelOverview.unregistered?.value,
                channelOverview.createdAt?.value,
                channelOverview.updatedAt?.value,
                channelOverview.deletedAt?.value,
                
            )
        );
    }

    updated(channelOverview: CciChannelOverview): void
    {
        this.apply(
            new UpdatedChannelOverviewEvent(
                channelOverview.id.value,
                channelOverview.tenantId?.value,
                channelOverview.tenantCode?.value,
                channelOverview.systemId?.value,
                channelOverview.systemName?.value,
                channelOverview.executionId?.value,
                channelOverview.executionType?.value,
                channelOverview.executionExecutedAt?.value,
                channelOverview.executionMonitoringStartAt?.value,
                channelOverview.executionMonitoringEndAt?.value,
                channelOverview.error?.value,
                channelOverview.inactive?.value,
                channelOverview.successful?.value,
                channelOverview.stopped?.value,
                channelOverview.unknown?.value,
                channelOverview.unregistered?.value,
                channelOverview.createdAt?.value,
                channelOverview.updatedAt?.value,
                channelOverview.deletedAt?.value,
                
            )
        );
    }

    deleted(channelOverview: CciChannelOverview): void
    {
        this.apply(
            new DeletedChannelOverviewEvent(
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
                channelOverview.error?.value,
                channelOverview.inactive?.value,
                channelOverview.successful?.value,
                channelOverview.stopped?.value,
                channelOverview.unknown?.value,
                channelOverview.unregistered?.value,
                channelOverview.createdAt?.value,
                channelOverview.updatedAt?.value,
                channelOverview.deletedAt?.value,
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
            error: this.error?.value,
            inactive: this.inactive?.value,
            successful: this.successful?.value,
            stopped: this.stopped?.value,
            unknown: this.unknown?.value,
            unregistered: this.unregistered?.value,
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
