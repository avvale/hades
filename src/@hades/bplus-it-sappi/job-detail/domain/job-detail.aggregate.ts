import { AggregateRoot } from '@nestjs/cqrs';
import { 
    JobDetailId, 
    JobDetailTenantId, 
    JobDetailTenantCode, 
    JobDetailSystemId, 
    JobDetailSystemName, 
    JobDetailExecutionId, 
    JobDetailExecutionType, 
    JobDetailExecutionExecutedAt, 
    JobDetailExecutionMonitoringStartAt, 
    JobDetailExecutionMonitoringEndAt, 
    JobDetailStatus, 
    JobDetailName, 
    JobDetailReturnCode, 
    JobDetailNode, 
    JobDetailUser, 
    JobDetailStartAt, 
    JobDetailEndAt, 
    JobDetailCreatedAt, 
    JobDetailUpdatedAt, 
    JobDetailDeletedAt
    
} from './value-objects';
import { CreatedJobDetailEvent } from './../application/events/created-job-detail.event';
import { UpdatedJobDetailEvent } from './../application/events/updated-job-detail.event';
import { DeletedJobDetailEvent } from './../application/events/deleted-job-detail.event';
import { AdminTenant } from '@hades/admin/tenant/domain/tenant.aggregate';
import { BplusItSappiSystem } from '@hades/bplus-it-sappi/system/domain/system.aggregate';
import { BplusItSappiExecution } from '@hades/bplus-it-sappi/execution/domain/execution.aggregate';

export class BplusItSappiJobDetail extends AggregateRoot
{
    id: JobDetailId;
    tenantId: JobDetailTenantId;
    tenant: AdminTenant;
    tenantCode: JobDetailTenantCode;
    systemId: JobDetailSystemId;
    system: BplusItSappiSystem;
    systemName: JobDetailSystemName;
    executionId: JobDetailExecutionId;
    execution: BplusItSappiExecution;
    executionType: JobDetailExecutionType;
    executionExecutedAt: JobDetailExecutionExecutedAt;
    executionMonitoringStartAt: JobDetailExecutionMonitoringStartAt;
    executionMonitoringEndAt: JobDetailExecutionMonitoringEndAt;
    status: JobDetailStatus;
    name: JobDetailName;
    returnCode: JobDetailReturnCode;
    node: JobDetailNode;
    user: JobDetailUser;
    startAt: JobDetailStartAt;
    endAt: JobDetailEndAt;
    createdAt: JobDetailCreatedAt;
    updatedAt: JobDetailUpdatedAt;
    deletedAt: JobDetailDeletedAt;
    
    constructor(id?: JobDetailId, tenantId?: JobDetailTenantId, tenantCode?: JobDetailTenantCode, systemId?: JobDetailSystemId, systemName?: JobDetailSystemName, executionId?: JobDetailExecutionId, executionType?: JobDetailExecutionType, executionExecutedAt?: JobDetailExecutionExecutedAt, executionMonitoringStartAt?: JobDetailExecutionMonitoringStartAt, executionMonitoringEndAt?: JobDetailExecutionMonitoringEndAt, status?: JobDetailStatus, name?: JobDetailName, returnCode?: JobDetailReturnCode, node?: JobDetailNode, user?: JobDetailUser, startAt?: JobDetailStartAt, endAt?: JobDetailEndAt, createdAt?: JobDetailCreatedAt, updatedAt?: JobDetailUpdatedAt, deletedAt?: JobDetailDeletedAt, )
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
        this.name = name;
        this.returnCode = returnCode;
        this.node = node;
        this.user = user;
        this.startAt = startAt;
        this.endAt = endAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: JobDetailId, tenantId: JobDetailTenantId, tenantCode: JobDetailTenantCode, systemId: JobDetailSystemId, systemName: JobDetailSystemName, executionId: JobDetailExecutionId, executionType: JobDetailExecutionType, executionExecutedAt: JobDetailExecutionExecutedAt, executionMonitoringStartAt: JobDetailExecutionMonitoringStartAt, executionMonitoringEndAt: JobDetailExecutionMonitoringEndAt, status: JobDetailStatus, name: JobDetailName, returnCode: JobDetailReturnCode, node: JobDetailNode, user: JobDetailUser, startAt: JobDetailStartAt, endAt: JobDetailEndAt, createdAt: JobDetailCreatedAt, updatedAt: JobDetailUpdatedAt, deletedAt: JobDetailDeletedAt, ): BplusItSappiJobDetail
    {
        return new BplusItSappiJobDetail(id, tenantId, tenantCode, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, status, name, returnCode, node, user, startAt, endAt, createdAt, updatedAt, deletedAt, );
    }

    created(jobDetail: BplusItSappiJobDetail): void
    {
        this.apply(
            new CreatedJobDetailEvent(
                jobDetail.id.value,
                jobDetail.tenantId.value,
                jobDetail.tenantCode.value,
                jobDetail.systemId.value,
                jobDetail.systemName.value,
                jobDetail.executionId.value,
                jobDetail.executionType.value,
                jobDetail.executionExecutedAt.value,
                jobDetail.executionMonitoringStartAt.value,
                jobDetail.executionMonitoringEndAt.value,
                jobDetail.status.value,
                jobDetail.name?.value,
                jobDetail.returnCode?.value,
                jobDetail.node?.value,
                jobDetail.user?.value,
                jobDetail.startAt.value,
                jobDetail.endAt.value,
                jobDetail.createdAt?.value,
                jobDetail.updatedAt?.value,
                jobDetail.deletedAt?.value,
                
            )
        );
    }

    updated(jobDetail: BplusItSappiJobDetail): void
    {
        this.apply(
            new UpdatedJobDetailEvent(
                jobDetail.id.value,
                jobDetail.tenantId?.value,
                jobDetail.tenantCode?.value,
                jobDetail.systemId?.value,
                jobDetail.systemName?.value,
                jobDetail.executionId?.value,
                jobDetail.executionType?.value,
                jobDetail.executionExecutedAt?.value,
                jobDetail.executionMonitoringStartAt?.value,
                jobDetail.executionMonitoringEndAt?.value,
                jobDetail.status?.value,
                jobDetail.name?.value,
                jobDetail.returnCode?.value,
                jobDetail.node?.value,
                jobDetail.user?.value,
                jobDetail.startAt?.value,
                jobDetail.endAt?.value,
                jobDetail.createdAt?.value,
                jobDetail.updatedAt?.value,
                jobDetail.deletedAt?.value,
                
            )
        );
    }

    deleted(jobDetail: BplusItSappiJobDetail): void
    {
        this.apply(
            new DeletedJobDetailEvent(
                jobDetail.id.value,
                jobDetail.tenantId.value,
                jobDetail.tenantCode.value,
                jobDetail.systemId.value,
                jobDetail.systemName.value,
                jobDetail.executionId.value,
                jobDetail.executionType.value,
                jobDetail.executionExecutedAt.value,
                jobDetail.executionMonitoringStartAt.value,
                jobDetail.executionMonitoringEndAt.value,
                jobDetail.status.value,
                jobDetail.name?.value,
                jobDetail.returnCode?.value,
                jobDetail.node?.value,
                jobDetail.user?.value,
                jobDetail.startAt.value,
                jobDetail.endAt.value,
                jobDetail.createdAt?.value,
                jobDetail.updatedAt?.value,
                jobDetail.deletedAt?.value,
                
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
            name: this.name?.value,
            returnCode: this.returnCode?.value,
            node: this.node?.value,
            user: this.user?.value,
            startAt: this.startAt.value,
            endAt: this.endAt.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
