import { AggregateRoot } from '@nestjs/cqrs';
import { 
    JobDetailId, 
    JobDetailTenantId, 
    JobDetailSystemId, 
    JobDetailSystemName, 
    JobDetailExecutionId, 
    JobDetailExecutionType, 
    JobDetailExecutionExecutedAt, 
    JobDetailExecutionMonitoringStartAt, 
    JobDetailExecutionMonitoringEndAt, 
    JobDetailStatus, 
    JobDetailDetail, 
    JobDetailExample, 
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
    detail: JobDetailDetail;
    example: JobDetailExample;
    createdAt: JobDetailCreatedAt;
    updatedAt: JobDetailUpdatedAt;
    deletedAt: JobDetailDeletedAt;
    
    constructor(id?: JobDetailId, tenantId?: JobDetailTenantId, systemId?: JobDetailSystemId, systemName?: JobDetailSystemName, executionId?: JobDetailExecutionId, executionType?: JobDetailExecutionType, executionExecutedAt?: JobDetailExecutionExecutedAt, executionMonitoringStartAt?: JobDetailExecutionMonitoringStartAt, executionMonitoringEndAt?: JobDetailExecutionMonitoringEndAt, status?: JobDetailStatus, detail?: JobDetailDetail, example?: JobDetailExample, createdAt?: JobDetailCreatedAt, updatedAt?: JobDetailUpdatedAt, deletedAt?: JobDetailDeletedAt, )
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
        this.status = status;
        this.detail = detail;
        this.example = example;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        
    }

    static register (id: JobDetailId,tenantId: JobDetailTenantId,systemId: JobDetailSystemId,systemName: JobDetailSystemName,executionId: JobDetailExecutionId,executionType: JobDetailExecutionType,executionExecutedAt: JobDetailExecutionExecutedAt,executionMonitoringStartAt: JobDetailExecutionMonitoringStartAt,executionMonitoringEndAt: JobDetailExecutionMonitoringEndAt,status: JobDetailStatus,detail: JobDetailDetail,example: JobDetailExample,createdAt: JobDetailCreatedAt,updatedAt: JobDetailUpdatedAt,deletedAt: JobDetailDeletedAt,): BplusItSappiJobDetail
    {
        return new BplusItSappiJobDetail(id, tenantId, systemId, systemName, executionId, executionType, executionExecutedAt, executionMonitoringStartAt, executionMonitoringEndAt, status, detail, example, createdAt, updatedAt, deletedAt, );
    }

    created(jobDetail: BplusItSappiJobDetail): void
    {
        this.apply(
            new CreatedJobDetailEvent(
                jobDetail.id.value,
                jobDetail.tenantId.value,
                jobDetail.systemId.value,
                jobDetail.systemName.value,
                jobDetail.executionId.value,
                jobDetail.executionType.value,
                jobDetail.executionExecutedAt.value,
                jobDetail.executionMonitoringStartAt.value,
                jobDetail.executionMonitoringEndAt.value,
                jobDetail.status.value,
                jobDetail.detail.value,
                jobDetail.example.value,
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
                jobDetail.systemId?.value,
                jobDetail.systemName?.value,
                jobDetail.executionId?.value,
                jobDetail.executionType?.value,
                jobDetail.executionExecutedAt?.value,
                jobDetail.executionMonitoringStartAt?.value,
                jobDetail.executionMonitoringEndAt?.value,
                jobDetail.status?.value,
                jobDetail.detail?.value,
                jobDetail.example?.value,
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
                jobDetail.systemId.value,
                jobDetail.systemName.value,
                jobDetail.executionId.value,
                jobDetail.executionType.value,
                jobDetail.executionExecutedAt.value,
                jobDetail.executionMonitoringStartAt.value,
                jobDetail.executionMonitoringEndAt.value,
                jobDetail.status.value,
                jobDetail.detail.value,
                jobDetail.example.value,
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
            systemId: this.systemId.value,
            systemName: this.systemName.value,
            executionId: this.executionId.value,
            executionType: this.executionType.value,
            executionExecutedAt: this.executionExecutedAt.value,
            executionMonitoringStartAt: this.executionMonitoringStartAt.value,
            executionMonitoringEndAt: this.executionMonitoringEndAt.value,
            status: this.status.value,
            detail: this.detail.value,
            example: this.example.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            
        }
    }
}
