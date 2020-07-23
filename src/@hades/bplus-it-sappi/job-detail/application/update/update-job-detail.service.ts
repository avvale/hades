import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Utils } from '@hades/shared/domain/lib/utils';
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
    
} from './../../domain/value-objects';
import { IJobDetailRepository } from './../../domain/job-detail.repository';
import { BplusItSappiJobDetail } from './../../domain/job-detail.aggregate';

@Injectable()
export class UpdateJobDetailService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IJobDetailRepository
    ) {}

    public async main(
        id: JobDetailId,
        tenantId?: JobDetailTenantId,
        tenantCode?: JobDetailTenantCode,
        systemId?: JobDetailSystemId,
        systemName?: JobDetailSystemName,
        executionId?: JobDetailExecutionId,
        executionType?: JobDetailExecutionType,
        executionExecutedAt?: JobDetailExecutionExecutedAt,
        executionMonitoringStartAt?: JobDetailExecutionMonitoringStartAt,
        executionMonitoringEndAt?: JobDetailExecutionMonitoringEndAt,
        status?: JobDetailStatus,
        name?: JobDetailName,
        returnCode?: JobDetailReturnCode,
        node?: JobDetailNode,
        user?: JobDetailUser,
        startAt?: JobDetailStartAt,
        endAt?: JobDetailEndAt,
        
    ): Promise<void>
    {        
        // create object with factory pattern
        const jobDetail = BplusItSappiJobDetail.register(
            id,
            tenantId,
            tenantCode,
            systemId,
            systemName,
            executionId,
            executionType,
            executionExecutedAt,
            executionMonitoringStartAt,
            executionMonitoringEndAt,
            status,
            name,
            returnCode,
            node,
            user,
            startAt,
            endAt,
            null,
            new JobDetailUpdatedAt(Utils.nowTimestamp()),
            null
        );
        
        // update
        await this.repository.update(jobDetail);        
            
        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const jobDetailRegister = this.publisher.mergeObjectContext(
            jobDetail
        );
        
        jobDetailRegister.updated(jobDetail); // apply event to model events
        jobDetailRegister.commit(); // commit all events of model
    }
}