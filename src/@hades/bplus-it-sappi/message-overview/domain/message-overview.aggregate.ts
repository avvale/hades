import { AggregateRoot } from '@nestjs/cqrs';
import { 
    MessageOverviewId, 
    MessageOverviewTenantId, 
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
    MessageOverviewDeletedAt
    
} from './value-objects';
import { CreatedMessageOverviewEvent } from './../application/events/created-message-overview.event';
import { UpdatedMessageOverviewEvent } from './../application/events/updated-message-overview.event';
import { DeletedMessageOverviewEvent } from './../application/events/deleted-message-overview.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';
import { BplusItSappiExecution } from '@hades/bplus-it-sappi/execution/domain/execution.aggregate';

export class BplusItSappiMessageOverview extends AggregateRoot
{
    id: MessageOverviewId;
    tenantId: MessageOverviewTenantId;
    tenant: AdminTenant;
    systemId: MessageOverviewSystemId;
    system: BplusItSappiSystem;
    systemName: MessageOverviewSystemName;
    executionId: MessageOverviewExecutionId;
    execution: BplusItSappiExecution;
    executionType: MessageOverviewExecutionType;
    executionExecutedAt: MessageOverviewExecutionExecutedAt;
    executionMonitoringStartAt: MessageOverviewExecutionMonitoringStartAt;
    executionMonitoringEndAt: MessageOverviewExecutionMonitoringEndAt;
    numberMax: MessageOverviewNumberMax;
    numberDays: MessageOverviewNumberDays;
    success: MessageOverviewSuccess;
    cancelled: MessageOverviewCancelled;
    delivering: MessageOverviewDelivering;
    error: MessageOverviewError;
    holding: MessageOverviewHolding;
    toBeDelivered: MessageOverviewToBeDelivered;
    waiting: MessageOverviewWaiting;
    createdAt: MessageOverviewCreatedAt;
    updatedAt: MessageOverviewUpdatedAt;
    deletedAt: MessageOverviewDeletedAt;
    
    constructor(id?: MessageOverviewId, tenantId?: MessageOverviewTenantId, systemId?: MessageOverviewSystemId, systemName?: MessageOverviewSystemName, executionId?: MessageOverviewExecutionId, executionType?: MessageOverviewExecutionType, executionExecutedAt?: MessageOverviewExecutionExecutedAt, executionMonitoringStartAt?: MessageOverviewExecutionMonitoringStartAt, executionMonitoringEndAt?: MessageOverviewExecutionMonitoringEndAt, numberMax?: MessageOverviewNumberMax, numberDays?: MessageOverviewNumberDays, success?: MessageOverviewSuccess, cancelled?: MessageOverviewCancelled, delivering?: MessageOverviewDelivering, error?: MessageOverviewError, holding?: MessageOverviewHolding, toBeDelivered?: MessageOverviewToBeDelivered, waiting?: MessageOverviewWaiting, createdAt?: MessageOverviewCreatedAt, updatedAt?: MessageOverviewUpdatedAt, deletedAt?: MessageOverviewDeletedAt, )
    {
        super();
        
        this.id = id;
        this.tenantId = tenantId;
        this.systemId = systemId;
        this.systemName = systemName;
        this.executionId = executionId;
        this.executionType = executionType;
        this.executionExecutedAt = executionExecutedAt;
        this.executionMonitoringStartAt = executionMonitoringStartAt;
        this.executionMonitoringEndAt = executionMonitoringEndAt;
        this.numberMax = numberMax;
        this.numberDays = numberDays;
        this.success = success;
        this.cancelled = cancelled;
        this.delivering = delivering;
        this.error = error;
        this.holding = holding;
        this.toBeDelivered = toBeDelivered;
        this.waiting = waiting;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: MessageOverviewId,tenantId: MessageOverviewTenantId,systemId: MessageOverviewSystemId,systemName: MessageOverviewSystemName,executionId: MessageOverviewExecutionId,executionType: MessageOverviewExecutionType,executionExecutedAt: MessageOverviewExecutionExecutedAt,executionMonitoringStartAt: MessageOverviewExecutionMonitoringStartAt,executionMonitoringEndAt: MessageOverviewExecutionMonitoringEndAt,numberMax: MessageOverviewNumberMax,numberDays: MessageOverviewNumberDays,success: MessageOverviewSuccess,cancelled: MessageOverviewCancelled,delivering: MessageOverviewDelivering,error: MessageOverviewError,holding: MessageOverviewHolding,toBeDelivered: MessageOverviewToBeDelivered,waiting: MessageOverviewWaiting,createdAt: MessageOverviewCreatedAt,updatedAt: MessageOverviewUpdatedAt,deletedAt: MessageOverviewDeletedAt,): BplusItSappiMessageOverview
    {
        return new BplusItSappiMessageOverview(id, tenantId, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, numberMax, numberDays, success, cancelled, delivering, error, holding, toBeDelivered, waiting, createdAt, updatedAt, deletedAt, );
    }

    created(messageOverview: BplusItSappiMessageOverview): void
    {
        this.apply(
            new CreatedMessageOverviewEvent(
                messageOverview.id.value,
                messageOverview.tenantId.value,
                messageOverview.systemId.value,
                messageOverview.systemName.value,
                messageOverview.executionId.value,
                messageOverview.executionType.value,
                messageOverview.executionExecutedAt.value,
                messageOverview.executionMonitoringStartAt.value,
                messageOverview.executionMonitoringEndAt.value,
                messageOverview.numberMax?.value,
                messageOverview.numberDays?.value,
                messageOverview.success?.value,
                messageOverview.cancelled?.value,
                messageOverview.delivering?.value,
                messageOverview.error?.value,
                messageOverview.holding?.value,
                messageOverview.toBeDelivered?.value,
                messageOverview.waiting?.value,
                messageOverview.createdAt?.value,
                messageOverview.updatedAt?.value,
                messageOverview.deletedAt?.value,
                
            )
        );
    }

    updated(messageOverview: BplusItSappiMessageOverview): void
    {
        this.apply(
            new UpdatedMessageOverviewEvent(
                messageOverview.id.value,
                messageOverview.tenantId?.value,
                messageOverview.systemId?.value,
                messageOverview.systemName?.value,
                messageOverview.executionId?.value,
                messageOverview.executionType?.value,
                messageOverview.executionExecutedAt?.value,
                messageOverview.executionMonitoringStartAt?.value,
                messageOverview.executionMonitoringEndAt?.value,
                messageOverview.numberMax?.value,
                messageOverview.numberDays?.value,
                messageOverview.success?.value,
                messageOverview.cancelled?.value,
                messageOverview.delivering?.value,
                messageOverview.error?.value,
                messageOverview.holding?.value,
                messageOverview.toBeDelivered?.value,
                messageOverview.waiting?.value,
                messageOverview.createdAt?.value,
                messageOverview.updatedAt?.value,
                messageOverview.deletedAt?.value,
                
            )
        );
    }

    deleted(messageOverview: BplusItSappiMessageOverview): void
    {
        this.apply(
            new DeletedMessageOverviewEvent(
                messageOverview.id.value,
                messageOverview.tenantId.value,
                messageOverview.systemId.value,
                messageOverview.systemName.value,
                messageOverview.executionId.value,
                messageOverview.executionType.value,
                messageOverview.executionExecutedAt.value,
                messageOverview.executionMonitoringStartAt.value,
                messageOverview.executionMonitoringEndAt.value,
                messageOverview.numberMax?.value,
                messageOverview.numberDays?.value,
                messageOverview.success?.value,
                messageOverview.cancelled?.value,
                messageOverview.delivering?.value,
                messageOverview.error?.value,
                messageOverview.holding?.value,
                messageOverview.toBeDelivered?.value,
                messageOverview.waiting?.value,
                messageOverview.createdAt?.value,
                messageOverview.updatedAt?.value,
                messageOverview.deletedAt?.value,
                
            )
        );
    }

    toDTO(): Object
    {
        return {
            id: this.id.value,
            tenantId: this.tenantId.value,
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            executionId: this.executionId.value,
            executionType: this.executionType.value,
            executionExecutedAt: this.executionExecutedAt.value,
            executionMonitoringStartAt: this.executionMonitoringStartAt.value,
            executionMonitoringEndAt: this.executionMonitoringEndAt.value,
            numberMax: this.numberMax?.value,
            numberDays: this.numberDays?.value,
            success: this.success?.value,
            cancelled: this.cancelled?.value,
            delivering: this.delivering?.value,
            error: this.error?.value,
            holding: this.holding?.value,
            toBeDelivered: this.toBeDelivered?.value,
            waiting: this.waiting?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
